import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
// import { headers } from 'next/headers'; // Rimosso import, usiamo req.headers

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil', 
  typescript: true,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text(); // Stripe richiede il corpo raw per la verifica
    const signature = req.headers.get('stripe-signature'); // Modificato per usare req.headers

    if (!webhookSecret) {
      console.error('Stripe webhook secret is not configured.');
      return NextResponse.json({ error: 'Webhook secret not configured.' }, { status: 500 });
    }
    
    if (!signature) {
      console.error('Stripe signature is missing from the request.');
      return NextResponse.json({ error: 'Missing Stripe signature.' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error constructing event';
      console.error(`⚠️ Webhook signature verification failed: ${message}`);
      return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
    }

    // Gestisci gli eventi specifici di Stripe
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`🔔 Checkout session completed: ${session.id}`);
        console.log(`   Client reference ID (User ID): ${session.client_reference_id}`);
        console.log(`   Customer Email: ${session.customer_details?.email}`);
        // Qui dovresti:
        // 1. Verificare se hai già processato questo evento (idempotenza).
        // 2. Recuperare l'utente tramite session.client_reference_id (che abbiamo impostato come user.uid).
        // 3. Aggiornare il database per concedere l'accesso al corso a quell'utente.
        //    Esempio: await grantCourseAccess(session.client_reference_id, 'corso_base_id');
        // 4. (Opzionale) Inviare un'email di conferma/benvenuto.
        break;
      
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`💰 PaymentIntent succeeded: ${paymentIntent.id}`);
        // Potresti gestire logica aggiuntiva qui se necessario,
        // ma per i pagamenti una tantum di Checkout, 'checkout.session.completed' è spesso sufficiente.
        break;

      case 'payment_intent.payment_failed':
        const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
        console.log(`❌ PaymentIntent failed: ${paymentIntentFailed.id}`);
        // Notifica l'utente, registra l'errore, ecc.
        break;
        
      // ... gestisci altri tipi di eventi rilevanti (es. charge.succeeded, invoice.paid, ecc.)

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Restituisci una risposta 200 OK a Stripe per confermare la ricezione.
    return NextResponse.json({ received: true });

  } catch (error: unknown) {
    console.error('Error processing Stripe webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error processing webhook';
    return NextResponse.json({ error: `Webhook handler error: ${errorMessage}` }, { status: 500 });
  }
}
