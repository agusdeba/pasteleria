import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  // Definimos los tipos de los datos que va a recibir el mail
  interface ContactEmailProps {
    name: string;
    email: string;
    phone: string;
    inquiry: string;
  }
  
  export default function ContactEmail({ name, email, phone, inquiry }: ContactEmailProps) {
    return (
      <Html>
        <Head />
        <Preview>Nueva consulta web de {name}</Preview>
        <Body style={main}>
          <Container style={container}>
            <Heading style={heading}>¡Nuevo mensaje desde la web!</Heading>
            
            <Section style={section}>
              <Text style={text}>
                <strong>Nombre:</strong> {name}
              </Text>
              <Text style={text}>
                <strong>Teléfono:</strong> {phone}
              </Text>
              <Text style={text}>
                <strong>Email:</strong> {email}
              </Text>
              
              <Hr style={hr} />
              
              <Text style={text}>
                <strong>Consulta:</strong>
              </Text>
              <Text style={inquiryText}>{inquiry}</Text>
            </Section>
            
            <Text style={footer}>
              Este correo fue enviado desde el formulario de contacto de la página web.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
  
  const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
  };
  
  const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    borderRadius: '8px',
    border: '1px solid #e6ebf1',
  };
  
  const heading = {
    fontSize: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.3',
    fontWeight: '400',
    color: '#2b5a41', // Un verde oscuro, podés cambiarlo al de tu marca
    padding: '17px 0 0',
    textAlign: 'center' as const,
  };
  
  const section = {
    padding: '0 24px',
  };
  
  const text = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '8px 0',
  };
  
  const inquiryText = {
    ...text,
    backgroundColor: '#f4f4f4',
    padding: '12px',
    borderRadius: '4px',
    fontStyle: 'italic',
  };
  
  const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
  };
  
  const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '0 24px',
    textAlign: 'center' as const,
  };