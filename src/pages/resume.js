import React from 'react';
import cc from 'classcat';
import { graphql } from 'gatsby';
import { format } from 'date-fns';
import { Layout } from '../components';

const h1Class = cc(['font-header', 'text-4xl', 'py-1', 'mb-2', 'print:mb-1']);
const h2Class = cc(['font-body', 'text-base', 'py-1', 'mb-1']);

const expH3Class = cc(['font-header', 'text-center', 'py-1']);
const expH4Class = cc(['font-body', 'text-lg', 'py-1']);
const expH5Class = cc(['font-body', 'text-base', 'py-1']);
const expLiClass = cc(['font-body', 'text-base', 'mb-1', 'print:text-sm']);

const sidebarH3Class = cc(['font-header', 'text-lg', 'text-center', 'py-3']);
const sidebarH4Class = cc([
  'font-body',
  'text-sm',
  'font-normal',
  'py-1',
  'print:py-0',
  'print:text-xs',
]);
const sidebarLiClass = cc(['font-body', 'text-sm', 'py-1', 'ml-1']);
const sidebarSubLiClass = cc(['font-body', 'text-xs', 'py-1']);

const ExpLi = ({ children }) => <li className={expLiClass}>{children}</li>;

const Experience = ({ experiences }) => (
  <div className="mx-auto">
    <h3 className={expH3Class}>Experience</h3>
    {experiences.edges.map(({ node }) => (
      <div className="mb-3">
        <div className="mb-2">
          <h4 className={expH4Class}>{node.companyName}</h4>
          {node.positions.map(({ title, start, end, responsibilities }) => (
            <div className="mb-3">
              <h5 className={expH5Class}>{title}</h5>
              <div className="font-body text-base mb-3">
                {format(start, 'MMMM YYYY')} to{' '}
                {end ? format(end, 'MMMM YYYY') : 'Present'}
              </div>
              <ul className="pl-5">
                {responsibilities.map(text => (
                  <ExpLi>{text}</ExpLi>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SidebarUl = ({ children }) => (
  <ul className="list-reset pl-1">{children}</ul>
);

const SidebarLi = ({ children, className }) => (
  <li className={cc([sidebarLiClass, className])}>{children}</li>
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

const SidebarItem = ({ children, className }) => (
  <div className={cc(['mx-3 lg:mx-0 lg:w-full', className])}>{children}</div>
);

const SidebarH3 = ({ children }) => (
  <h3 className={sidebarH3Class}>{children}</h3>
);

const SidebarH4 = ({ children, className = '' }) => (
  <h4 className={cc([sidebarH4Class, className])}>{children}</h4>
);

const Sidebar = ({ skills }) => (
  <div className="flex lg:flex-col print:flex-col flex-row">
    <SidebarItem>
      <SidebarH3>Projects</SidebarH3>
      <SidebarUl>
        <SidebarLi>
          <SidebarH4>
            <ExternalLink href="https://github.com/tc39/proposal-pipeline-operator/">
              Pipeline Operator
            </ExternalLink>{' '}
            TC39, Community Advocate
          </SidebarH4>
          <ul>
            <SidebarSubLi>
              Advocate for introduction of new syntax into ECMAScript
              specification with TC39
            </SidebarSubLi>
            <SidebarSubLi>
              Developing babel plugins for competing proposals to gather user
              feedback
            </SidebarSubLi>
          </ul>
        </SidebarLi>
        <SidebarLi>
          <SidebarH4>
            <ExternalLink href="https://github.com/mAAdhaTTah/brookjs/">
              brookjs
            </ExternalLink>
            , Lead Maintainer
          </SidebarH4>
          <ul>
            <SidebarSubLi>
              React/Redux framework for building streaming web applications
            </SidebarSubLi>
            <SidebarSubLi>
              Integrates functional reactive programming principles with Kefir
            </SidebarSubLi>
          </ul>
        </SidebarLi>
        <SidebarLi>
          <SidebarH4>
            <ExternalLink href="https://github.com/kefirjs/kefir/">
              Kefir
            </ExternalLink>{' '}
            &{' '}
            <ExternalLink href="https://github.com/PrismJS/prism/">
              Prism.js
            </ExternalLink>
            , Maintainer
          </SidebarH4>
          <ul>
            <SidebarSubLi>
              Invited to join team after repeated quality contributions &
              engagement
            </SidebarSubLi>
            <SidebarSubLi>
              Extracted and released chai-kefir to enable unit testing Kefir
              streams
            </SidebarSubLi>
            <SidebarSubLi>
              Implemented copy-to-clipboard plugin to copy PrismJS code snippets
            </SidebarSubLi>
          </ul>
        </SidebarLi>
        <SidebarLi>
          <SidebarH4>
            <ExternalLink href="https://github.com/intraxia/WP-Gistpen/">
              WP-Gistpen
            </ExternalLink>
            , Lead Maintainer
          </SidebarH4>
          <ul>
            <SidebarSubLi>
              WordPress plugin to save user's code snippets to their personal
              site
            </SidebarSubLi>
            <SidebarSubLi>
              Implemented syntax-highlighted text editor with brookjs, React,
              Redux, Kefir, and PrismJS
            </SidebarSubLi>
          </ul>
        </SidebarLi>
      </SidebarUl>
    </SidebarItem>
    <SidebarItem>
      <SidebarH3>Talks</SidebarH3>
      <SidebarUl>
        <SidebarLi>
          <SidebarH4>
            <ExternalLink href="http://talks.jamesdigioia.com/brookjs-at-reactnyc">
              Meet <code>brookjs</code>
            </ExternalLink>
          </SidebarH4>
        </SidebarLi>
        <SidebarLi>
          <SidebarH4>
            <ExternalLink href="http://talks.jamesdigioia.com/using-vuejs-in-server-rendered-environments#/">
              Using Vue.js in Server Rendered Environments
            </ExternalLink>
          </SidebarH4>
        </SidebarLi>
        <SidebarLi>
          <SidebarH4>
            <ExternalLink href="http://talks.jamesdigioia.com/wpgistpen-a-gist-clone-for-wordpress">
              WP-Gistpen: A Gist Clone for WordPress
            </ExternalLink>
          </SidebarH4>
        </SidebarLi>
      </SidebarUl>
    </SidebarItem>
    <SidebarItem>
      <SidebarH3>Volunteering</SidebarH3>
      <SidebarUl>
        <SidebarLi>
          <SidebarH4>Code Nation</SidebarH4>
          <ul>
            <SidebarSubLi>
              Taught web development to students at under-resourced high schools
            </SidebarSubLi>
            <SidebarSubLi>
              Lead team of students at competitive hackathon
            </SidebarSubLi>
            <SidebarSubLi>
              Mentored interns on internal projects at Valtech Summer of 2017 &
              2018
            </SidebarSubLi>
          </ul>
        </SidebarLi>
      </SidebarUl>
    </SidebarItem>
    <div className="print:h-32" />
    <SidebarItem>
      <SidebarH3>Skills</SidebarH3>
      <SidebarUl>
        {skills.edges.map(({ node }) => (
          <SidebarLi>
            <SidebarH4>{node.name}</SidebarH4>
            {node.keywords?.join(', ')}
          </SidebarLi>
        ))}
      </SidebarUl>
    </SidebarItem>
  </div>
);

const Resume = ({ data }) => (
  <Layout isHome={false}>
    <div className="bg-primary-color text-2xl print:text-base">
      <div className="mx-auto text-center mb-2">
        <h1 className={h1Class}>James DiGioia</h1>
        <h2 className={h2Class}>New York, NY</h2>
        <p className="text-sm font-body">
          I am a Senior Front-End Engineer with experience in modern web
          frameworks & team leadership.
        </p>
      </div>
      <div className="mx-auto px-4 print:mx-2 flex max-w-2xl flex-col lg:flex-row print:flex-row pb-2">
        <div className="flex-grow basis-100">
          <Experience experiences={data.allExperienceJson} />
        </div>
        <div className="flex-shrink basis-3 lg:mx-3">
          <Sidebar skills={data.allSkillsJson} />
        </div>
      </div>
    </div>
  </Layout>
);

export const pageQuery = graphql`
  query ResumeQuery {
    allExperienceJson {
      edges {
        node {
          companyName
          positions {
            title
            start
            end
            responsibilities
          }
        }
      }
    }

    allSkillsJson {
      edges {
        node {
          name
          keywords
        }
      }
    }
  }
`;

export default Resume;
