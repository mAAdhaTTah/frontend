import useSWR from 'swr';
import { Resume } from '@ui/resume';
import { strapiFetcher } from '@strapi/api';
import { format, parse } from 'date-fns';

const useStrapiResume = id => {
  const { data } = useSWR(`/resumes/${id}`, strapiFetcher);
  return data;
};

const parseStrapiDate = date => parse(date, 'yyyy-MM-dd', new Date());

const jobToPosition = job => ({
  title: job.position,
  start: format(parseStrapiDate(job.startDate), 'MMMM yyyy'),
  end: job.endDate && format(parseStrapiDate(job.endDate), 'MMMM yyyy'),
  responsibilities: job.highlights.map(({ text }) => text),
});

export const StrapiResume = ({ id }) => {
  // TODO(James) Suspense
  const resume = useStrapiResume(id);
  if (!resume) return null;
  return (
    <Resume
      name={resume.basics.name}
      location={`${resume.basics.location.city}, ${resume.basics.location.region}`}
      description={resume.basics.summary}
      experiences={resume.work.reduce((exps, job) => {
        const lastExp = exps[exps.length - 1];
        if (lastExp?.companyName === job.name) {
          lastExp.positions.push(jobToPosition(job));
        } else {
          exps.push({
            companyName: job.name,
            description: job.summary,
            positions: [jobToPosition(job)],
          });
        }
        return exps;
      }, [])}
      projects={resume.projects.map(project => ({
        name: project.name,
        url: project.url,
        role: project.roles.map(({ title }) => title).join(', '),
        highlights: project.highlights.map(({ text }) => text),
      }))}
      talks={resume.publications.map(pub => ({
        name: pub.name,
        url: pub.url,
      }))}
      volunteering={resume.volunteer.map(vol => ({
        name: vol.name,
        highlights: vol.highlights.map(({ text }) => text),
      }))}
      skills={resume.skills.map(skill => ({
        name: skill.name,
        keywords: skill.keywords.map(({ text }) => text),
      }))}
    />
  );
};
