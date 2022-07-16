import PropTypes from 'prop-types';
import cc from 'classcat';
import { Article } from '@ui/box';

const h1Class = cc([
  'font-muli',
  'text-4xl',
  'py-1',
  'mb-2',
  'print:mb-1',
  'print:py-0',
]);
const h2Class = cc(['font-ovo', 'text-base', 'py-1', 'mb-1']);

const expH3Class = cc(['font-muli', 'text-center', 'py-1']);
const expH4Class = cc(['font-muli', 'text-lg', 'py-1', 'print:text-md']);
const expH5Class = cc(['font-ovo', 'text-base', 'py-1', 'print:text-sm']);
const expLiClass = cc(['font-ovo', 'text-base', 'mb-1', 'print:text-sm']);

const sidebarH3Class = cc([
  'font-muli',
  'text-lg',
  'text-center',
  'py-3',
  'print:py-0',
]);
const sidebarH4Class = cc([
  'font-ovo',
  'text-sm',
  'font-normal',
  'py-1',
  'print:py-0',
]);
const sidebarLiClass = cc(['font-ovo', 'text-sm', 'py-1', 'ml-1']);
const sidebarSubLiClass = cc(['font-ovo', 'text-xs', 'py-1']);

const ExpLi = ({ children }) => <li className={expLiClass}>{children}</li>;

const Experience = ({ experiences }) => (
  <div className="mx-auto">
    <h3 className={expH3Class}>Experience</h3>
    {experiences.map((exp, key) => (
      <div className="mb-3" key={key}>
        <div className="mb-2">
          <h4 className={expH4Class}>
            {exp.companyName} - <small>{exp.description}</small>
          </h4>
          {exp.positions.map(({ title, start, end, responsibilities }, key) => (
            <div className="mb-3" key={key}>
              <h5 className={expH5Class}>{title}</h5>
              <div className="font-ovo text-base mb-3">
                {start} to {end ?? 'Present'}
              </div>
              <ul className="list-disc pl-5">
                {responsibilities.map((text, key) => (
                  <ExpLi key={key}>{text}</ExpLi>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

Experience.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      companyName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      positions: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          start: PropTypes.string.isRequired,
          end: PropTypes.string,
          responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

const SidebarUl = ({ children }) => <ul className="pl-1">{children}</ul>;

const SidebarLi = ({ children, className = '' }) => (
  <li className={cc([sidebarLiClass, className])}>{children}</li>
);

const SidebarSubUl = ({ children }) => (
  <ul className="list-disc pl-5">{children}</ul>
);

const SidebarSubLi = ({ children }) => (
  <li className={sidebarSubLiClass}>{children}</li>
);

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    className="print:no-underline"
  >
    {children}
  </a>
);

const SidebarItem = ({ children, className = '' }) => (
  <div
    className={cc([
      'mx-3',
      'lg:mx-0',
      'lg:w-full',
      'print:avoid-break-inside',
      className,
    ])}
  >
    {children}
  </div>
);

const SidebarH3 = ({ children }) => (
  <h3 className={sidebarH3Class}>{children}</h3>
);

const SidebarH4 = ({ children, className = '' }) => (
  <h4 className={cc([sidebarH4Class, className])}>{children}</h4>
);

const Projects = ({ projects }) => (
  <SidebarItem>
    <SidebarH3>Projects</SidebarH3>
    <SidebarUl>
      {projects.map(({ name, url, role, highlights }, key) => (
        <SidebarLi key={key}>
          <SidebarH4>
            <ExternalLink href={url}>{name}</ExternalLink>, {role}
          </SidebarH4>
          <SidebarSubUl>
            {highlights.map((highlight, key) => (
              <SidebarSubLi key={key}>{highlight}</SidebarSubLi>
            ))}
          </SidebarSubUl>
        </SidebarLi>
      ))}
    </SidebarUl>
  </SidebarItem>
);

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
};

const Talks = ({ talks }) => (
  <SidebarItem>
    <SidebarH3>Talks</SidebarH3>
    <SidebarUl>
      {talks.map(({ name, url }, key) => (
        <SidebarLi key={key}>
          <SidebarH4 className="print:text-xs">
            <ExternalLink href={url}>{name}</ExternalLink>
          </SidebarH4>
        </SidebarLi>
      ))}
    </SidebarUl>
  </SidebarItem>
);

Talks.propTypes = {
  talks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const Volunteering = ({ volunteering }) => (
  <SidebarItem>
    <SidebarH3>Volunteering</SidebarH3>
    <SidebarUl>
      {volunteering.map(({ name, highlights }, key) => (
        <SidebarLi key={key}>
          <SidebarH4>{name}</SidebarH4>
          <SidebarSubUl>
            {highlights.map((highlight, key) => (
              <SidebarSubLi key={key}>{highlight}</SidebarSubLi>
            ))}
          </SidebarSubUl>
        </SidebarLi>
      ))}
    </SidebarUl>
  </SidebarItem>
);

Volunteering.propTypes = {
  volunteering: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
};

const Skills = ({ skills }) => (
  <SidebarItem>
    <SidebarH3>Skills</SidebarH3>
    <SidebarUl>
      {skills.map((skill, key) => (
        <SidebarLi
          key={key}
          className={cc(['print:py-0', 'print:ml-1', 'print:inline'])}
        >
          <SidebarH4 className={cc(['print:inline', 'print:font-bold'])}>
            {skill.name}
          </SidebarH4>
          <span className={cc(['hidden', 'print:inline'])}>, </span>
          {skill.keywords?.join(', ')}
        </SidebarLi>
      ))}
    </SidebarUl>
  </SidebarItem>
);

Skills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      keywords: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

const Sidebar = ({ projects, talks, volunteering, skills }) => (
  <div className="flex flex-col">
    <Projects projects={projects} />
    <Talks talks={talks} />
    <Volunteering volunteering={volunteering} />
    <Skills skills={skills} />
  </div>
);

Sidebar.propTypes = {
  projects: PropTypes.array.isRequired,
  talks: PropTypes.array.isRequired,
  volunteering: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
};

export const Resume = ({
  name,
  location,
  description,
  experiences,
  projects,
  talks,
  volunteering,
  skills,
}) => (
  <div className="mx-4 pt-5 print:pt-0 print:mx-0 print:max-w-full">
    <div className="bg-primary text-2xl print:text-base">
      <div className="mx-auto text-center mb-2">
        <h1 className={h1Class}>{name}</h1>
        <h2 className={h2Class}>{location}</h2>
        <p className="text-sm font-ovo">{description}</p>
      </div>
      <div className="mx-auto px-4 print:mx-2 flex max-w-2xl flex-col xl:flex-row pb-2">
        <div className="grow basis-100">
          <Experience experiences={experiences} />
        </div>
        <div className="flex-shrink lg:mx-3">
          <Sidebar
            projects={projects}
            talks={talks}
            volunteering={volunteering}
            skills={skills}
          />
        </div>
      </div>
    </div>
  </div>
);

Resume.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  experiences: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  talks: PropTypes.array.isRequired,
  volunteering: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
};
