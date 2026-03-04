-- Importar experiencias a Supabase
-- Ejecuta este SQL en el SQL Editor de Supabase

INSERT INTO experiences (job, city, country, startdate, finishdate, description, company, tags, published) VALUES
(
  'Desarrollador Backend/Frontend, Especialista HubSpot & Ciberseguridad',
  'Madrid',
  'España',
  '2023-01-01',
  NULL,
  '• Desarrollo de aplicaciones web con React/Next.js.
• Creación de integraciones y automatizaciones a medida con Node.js y APIs de cualquier plataforma.
• Desarrollo de experimentos en CRO con VWO para mejorar la conversión y la experiencia de usuario.
• Aplicación de IA y MCPs para optimizar procesos internos y externos.
• Responsable de la formación de perfiles de marketing del área Activation y Loyalty.
• Desarrollo backend y mantenimiento de sitios WordPress, incluyendo plugins y funcionalidades personalizadas.',
  'LIN3S',
  'React,Node.js,HubSpot,WordPress,CRO,IA',
  true
),
(
  'Analista de Marketing',
  'Madrid',
  'España',
  '2020-01-01',
  '2023-12-31',
  '• Gestión de campañas y automatizaciones de marketing digital usando Zapier, HubSpot y CMS.
• Integración de sistemas CRM.
• Desarrollo de temas, componentes y plantillas en HubSpot con HubL.
• Diseño web multidispositivo y experiencia de usuario optimizada para conversiones.',
  'LIN3S',
  'HubSpot,Zapier,Marketing Digital,CRM,HubL,UX/UI',
  true
),
(
  'Desarrollador Frontend en prácticas',
  'Madrid',
  'España',
  '2018-01-01',
  '2020-12-31',
  '• Desarrollo de interfaces web y componentes frontend con HTML, CSS, JavaScript y React.js.
• Participación en proyectos multidisciplinares, aplicando buenas prácticas de UX/UI y desarrollo web adaptable.',
  'LIN3S',
  'HTML,CSS,JavaScript,React.js,UX/UI',
  true
);
