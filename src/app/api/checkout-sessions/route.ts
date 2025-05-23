import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inizializza Stripe con la tua chiave segreta.
// È consigliabile usare la STRIPE_RESTRICTED_SECRET_KEY se configurata con i permessi adeguati,
// altrimenti la STRIPE_SECRET_KEY completa.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil', // VERSIONE API AGGIORNATA COME DA ERRORE TYPESCRIPT
  typescript: true,
});

export async function POST(req: NextRequest) {
  try {
    const { priceId, userId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }
    if (!userId) {
      // Anche se potremmo procedere senza userId per Stripe, è utile per associare l'acquisto
      console.warn('User ID not provided for checkout session, proceeding without client_reference_id');
    }

    // Determina l'URL base della tua applicazione per gli URL di successo e cancellazione
    // In produzione, questo dovrebbe essere il tuo dominio effettivo.
    // Per lo sviluppo, Vercel imposta automaticamente process.env.VERCEL_URL.
    // In locale, puoi usare un fallback come http://localhost:3000.
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const successUrl = new URL('/pagamento/successo', baseUrl);
    successUrl.searchParams.append('session_id', '{CHECKOUT_SESSION_ID}');

    const cancelUrl = new URL('/corsi/base', baseUrl); // O una pagina specifica di cancellazione

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),
    };

    // Aggiungi client_reference_id solo se l'userId è disponibile
    // Questo ID ti aiuterà a riconciliare l'acquisto con l'utente nel tuo sistema (es. tramite webhook)
    if (userId) {
      sessionParams.client_reference_id = userId;
    }
    // Potresti voler aggiungere anche customer_email se l'utente è loggato
    // e hai la sua email, per precompilare il campo email nel checkout di Stripe.
    // if (userEmail) {
    //   sessionParams.customer_email = userEmail;
    // }


    const session = await stripe.checkout.sessions.create(sessionParams);

    // Restituisci l'ID della sessione al client
    return NextResponse.json({ sessionId: session.id });

  } catch (error: unknown) {
    console.error('Error creating Stripe checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    return NextResponse.json({ error: `Internal Server Error: ${errorMessage}` }, { status: 500 });
  }
}
