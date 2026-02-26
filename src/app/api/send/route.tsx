import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import ContactEmail from '@/components/emails/ContactEmail';

// Inicializamos el cliente de Resend con la variable de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Obtenemos los datos que nos manda el formulario
    const body = await request.json();
    const { name, phone, email, inquiry } = body;

    const htmlContent = await render(
      <ContactEmail name={name} email={email} phone={phone} inquiry={inquiry} />
    );
    
    const data = await resend.emails.send({
      from: 'Pastelería web <onboarding@resend.dev>', // Este remitente es obligatorio para pruebas
      to: ['agusdebattista@gmail.com'], // ACÁ PONÉ TU EMAIL
      subject: `Nueva consulta web de: ${name}`,
      react: ContactEmail({ name, email, phone, inquiry }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error enviando el email:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}