import React from 'react';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { contact, profile } from '../content';

export default function Contact() {
  return (
    <>
      <PageHeader title="Contact">{contact.intro}</PageHeader>
      <div className="mx-auto max-w-[73.75rem] px-5 md:px-8 pb-24 grid md:grid-cols-12 gap-x-12 gap-y-16">
        <div className="md:col-span-7">
          <ContactForm />
        </div>
        <aside className="md:col-span-5 space-y-8">
          <div>
            <p className="text-sm text-ink-3">Email</p>
            <a href={`mailto:${contact.email}`} className="mt-1 inline-block font-display font-bold text-2xl tracking-[-0.02em] break-all underline decoration-flag decoration-2 underline-offset-8 hover:text-flag-ink">
              {contact.email}
            </a>
          </div>
          <div>
            <p className="text-sm text-ink-3">LinkedIn</p>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-lg underline decoration-rule underline-offset-4 hover:decoration-flag">
              linkedin.com/in/armankanorwalla ↗
            </a>
          </div>
          <div>
            <p className="text-sm text-ink-3">Based in</p>
            <p className="mt-1 text-lg">{profile.location}</p>
            <p className="text-ink-2">{profile.relocation}</p>
          </div>
          <div>
            <p className="text-sm text-ink-3">Education</p>
            <p className="mt-1 text-ink-2">{profile.degreeLine}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
