// src/app/api/submit-coaching-request/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, challenge, goals, availability, targetEmail } = body;

    if (!name || !email || !challenge || !goals || !targetEmail) {
      return NextResponse.json({ message: 'Dati mancanti. Tutti i campi obbligatori (nome, email, sfida, obiettivi) e targetEmail sono richiesti.' }, { status: 400 });
    }

    if (!/\S+@\S+\.\S+/.test(email) || !/\S+@\S+\.\S+/.test(targetEmail)) {
      return NextResponse.json({ message: 'Formato email non valido per l_utente o per targetEmail.' }, { status: 400 });
    }

    console.log('--- NUOVA RICHIESTA COACHING (ricevuta in src/app/api/) ---');
    console.log(`Email Destinatario: ${targetEmail}`);
    console.log(`Nome: ${name}`);
    console.log(`Email Contatto: ${email}`);
    console.log(`Sfida: ${challenge}`);
    console.log(`Obiettivi: ${goals}`);
    console.log(`Disponibilità: ${availability || 'Non specificata'}`);
    console.log('--------------------------------');

    // In un'applicazione reale, qui integreresti l'invio email effettivo
    // Esempio: await sendEmail({ to: targetEmail, subject: `Nuova Richiesta da ${name}`, html: ... });

    return NextResponse.json({ message: 'Richiesta ricevuta con successo (simulato)', data: body }, { status: 200 });

  } catch (error: unknown) { // Tipizzato error come unknown
    console.error('Errore API:', error);
    const message = error instanceof Error ? error.message : "An unexpected server error occurred.";
    return NextResponse.json({ message: 'Errore interno del server.', error: message }, { status: 500 });
  }
}
