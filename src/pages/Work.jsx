import React from 'react';
import PageHeader from '../components/PageHeader';
import Entry from '../components/Entry';
import { experiences, education } from '../content';

export default function Work() {
  return (
    <>
      <PageHeader title="Experience" />
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 pb-24">
        {experiences.map((e) => <Entry key={e.id} entry={e} />)}
        <h2 className="mt-16 mb-2 font-display font-extrabold text-4xl md:text-5xl tracking-[-0.03em]">Education</h2>
        <Entry entry={education} />
      </div>
    </>
  );
}
