import { Resume } from '@ui/resume';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { format } from 'date-fns';
import { Main } from '@ui/box';
import { parseTinaDate } from './dates';

const jobToPosition = job => ({
  title: job.position,
  start: format(parseTinaDate(job.startDate), 'MMMM yyyy'),
  end: job.endDate && format(parseTinaDate(job.endDate), 'MMMM yyyy'),
  responsibilities: job.highlights,
});

const LandingBlock = ({ block }) => {
  switch (block.__typename) {
    case 'PageLandingBodyResumeEmbed':
      const { resume } = block;
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
            role: project.roles.join(', '),
            highlights: project.highlights,
          }))}
          talks={resume.publications.map(pub => ({
            name: pub.name,
            url: pub.url,
          }))}
          volunteering={resume.volunteer.map(vol => ({
            name: vol.organization,
            highlights: vol.highlights,
          }))}
          skills={resume.skills.map(skill => ({
            name: skill.name,
            keywords: skill.keywords,
          }))}
        />
      );
    case 'PageLandingBodyRichText':
      return <TinaMarkdown content={block.content} />;
    default:
      return null;
  }
};

export const PageLanding = ({ data }) => {
  return (
    <Main>
      {data.page.body.map((block, i) => (
        <LandingBlock key={i} block={block} />
      ))}
    </Main>
  );
};
