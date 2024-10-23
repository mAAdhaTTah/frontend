import cc from 'classcat';
import { FC, ReactNode } from 'react';

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

const ExpLi: FC<{ children: ReactNode }> = ({ children }) => (
  <li className={expLiClass}>{children}</li>
);

type Position = {
  title: string;
  start: string;
  end?: string;
  responsibilities: string[];
};

type Experience = {
  companyName: string;
  description?: string;
  positions: Position[];
};

type ExperienceProps = {
  experiences: Experience[];
};

const Experience: FC<ExperienceProps> = ({ experiences }) => (
  <div className="mx-auto">
    <h3 className={expH3Class}>Experience</h3>
    {experiences.map((exp, key) => (
      <div className="mb-3" key={key}>
        <div className="mb-2">
          <h4 className={expH4Class}>
            {exp.companyName}
            {exp.description && (
              <>
                {' '}
                - <small>{exp.description}</small>
              </>
            )}
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

const SidebarUl: FC<{ children: ReactNode }> = ({ children }) => (
  <ul className="pl-1">{children}</ul>
);

const SidebarLi: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <li className={cc([sidebarLiClass, className])}>{children}</li>;

const SidebarSubUl: FC<{ children: ReactNode }> = ({ children }) => (
  <ul className="list-disc pl-5">{children}</ul>
);

const SidebarSubLi: FC<{ children: ReactNode }> = ({ children }) => (
  <li className={sidebarSubLiClass}>{children}</li>
);

const ExternalLink: FC<{ children: ReactNode; href: string }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    className="print:no-underline"
  >
    {children}
  </a>
);

const SidebarItem: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
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

const SidebarH3: FC<{ children: ReactNode }> = ({ children }) => (
  <h3 className={sidebarH3Class}>{children}</h3>
);

const SidebarH4: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <h4 className={cc([sidebarH4Class, className])}>{children}</h4>;

type Project = {
  name: string;
  url: string;
  role: string;
  highlights: string[];
};

type ProjectsProps = {
  projects: Project[];
};

const Projects: FC<ProjectsProps> = ({ projects }) => (
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

type Talk = {
  name: string;
  url: string;
};

type TalksProps = {
  talks: Talk[];
};

const Talks: FC<TalksProps> = ({ talks }) => (
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

type Volunteering = {
  name: string;
  highlights: string[];
};

type VolunteeringProps = {
  volunteering: Volunteering[];
};

const Volunteering: FC<VolunteeringProps> = ({ volunteering }) => (
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

type Skill = {
  name: string;
  keywords?: string[];
};

type SkillsProps = {
  skills: Skill[];
};

const Skills: FC<SkillsProps> = ({ skills }) => (
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

type SidebarProps = {
  projects: Project[];
  talks: Talk[];
  volunteering: Volunteering[];
  skills: Skill[];
};

const Sidebar: FC<SidebarProps> = ({
  projects,
  talks,
  volunteering,
  skills,
}) => (
  <div className="flex flex-col">
    <Projects projects={projects} />
    <Talks talks={talks} />
    <Volunteering volunteering={volunteering} />
    <Skills skills={skills} />
  </div>
);

type ResumeProps = {
  name: string;
  location: string;
  description: string;
  experiences: Experience[];
  projects: Project[];
  talks: Talk[];
  volunteering: Volunteering[];
  skills: Skill[];
};

export const Resume: FC<ResumeProps> = ({
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
