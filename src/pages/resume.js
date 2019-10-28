import React from 'react';
import cc from 'classcat';
import { graphql } from 'gatsby';
import { format } from 'date-fns';
import { withSEO } from '../decorators';

const h1Class = cc([
  'font-header',
  'text-4xl',
  'py-1',
  'mb-2',
  'print:mb-1',
  'print:py-0',
]);
const h2Class = cc(['font-body', 'text-base', 'py-1', 'mb-1']);

const expH3Class = cc(['font-header', 'text-center', 'py-1']);
const expH4Class = cc(['font-header', 'text-lg', 'py-1', 'print:text-md']);
const expH5Class = cc(['font-body', 'text-base', 'py-1', 'print:text-sm']);
const expLiClass = cc(['font-body', 'text-base', 'mb-1', 'print:text-sm']);

const sidebarH3Class = cc([
  'font-header',
  'text-lg',
  'text-center',
  'py-3',
  'print:py-0',
]);
const sidebarH4Class = cc([
  'font-body',
  'text-sm',
  'font-normal',
  'py-1',
  'print:py-0',
]);
const sidebarLiClass = cc(['font-body', 'text-sm', 'py-1', 'ml-1']);
const sidebarSubLiClass = cc(['font-body', 'text-xs', 'py-1']);

const ExpLi = ({ children }) => <li className={expLiClass}>{children}</li>;

const Experience = ({ experiences }) => (
  <div className="mx-auto">
    <h3 className={expH3Class}>Experience</h3>
    {experiences.edges.map(({ node }, key) => (
      <div className="mb-3" key={key}>
        <div className="mb-2">
          <h4 className={expH4Class}>
            {node.companyName} - <small>{node.description}</small>
          </h4>
          {node.positions.map(
            ({ title, start, end, responsibilities }, key) => (
              <div className="mb-3" key={key}>
                <h5 className={expH5Class}>{title}</h5>
                <div className="font-body text-base mb-3">
                  {format(start, 'MMMM YYYY')} to{' '}
                  {end ? format(end, 'MMMM YYYY') : 'Present'}
                </div>
                <ul className="pl-5">
                  {responsibilities.map((text, key) => (
                    <ExpLi key={key}>{text}</ExpLi>
                  ))}
                </ul>
              </div>
            )
          )}
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

const SidebarSubUl = ({ children }) => <ul className="pl-5">{children}</ul>;

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
  <div className="flex flex-col">
    <SidebarItem>
      <SidebarH3>Projects</SidebarH3>
      <SidebarUl>
        <SidebarLi>
          <SidebarH4>
            <ExternalLink href="https://github.com/tc39/proposal-pipeline-operator/">
              Pipeline Operator
            </ExternalLink>
            , Community Advocate
          </SidebarH4>
          <SidebarSubUl>
            <SidebarSubLi>
              Advocate for new syntax into ECMAScript specification with TC39
            </SidebarSubLi>
            <SidebarSubLi>
              Developing babel plugins for competing proposals to gather user
              feedback
            </SidebarSubLi>
          </SidebarSubUl>
        </SidebarLi>
        <SidebarLi>
          <SidebarH4>
            <ExternalLink href="https://github.com/mAAdhaTTah/brookjs/">
              brookjs
            </ExternalLink>
            , Lead Maintainer
          </SidebarH4>
          <SidebarSubUl>
            <SidebarSubLi>
              React/Redux framework for building streaming web applications
            </SidebarSubLi>
            <SidebarSubLi>
              Integrates functional reactive programming principles with Kefir
            </SidebarSubLi>
          </SidebarSubUl>
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
          <SidebarSubUl>
            <SidebarSubLi>
              Joined teams after repeated quality contributions & engagement
            </SidebarSubLi>
            <SidebarSubLi>
              Extracted and released chai-kefir to enable unit testing Kefir
              streams
            </SidebarSubLi>
            <SidebarSubLi>
              Implemented copy-to-clipboard plugin to copy PrismJS code snippets
            </SidebarSubLi>
          </SidebarSubUl>
        </SidebarLi>
        <SidebarLi>
          <SidebarH4>
            <ExternalLink href="https://github.com/intraxia/WP-Gistpen/">
              WP-Gistpen
            </ExternalLink>
            , Lead Maintainer
          </SidebarH4>
          <SidebarSubUl>
            <SidebarSubLi>
              WordPress plugin to save user's code snippets to their personal
              site
            </SidebarSubLi>
            <SidebarSubLi>
              Implemented syntax-highlighted editor with brookjs, React, Kefir,
              and PrismJS
            </SidebarSubLi>
          </SidebarSubUl>
        </SidebarLi>
      </SidebarUl>
    </SidebarItem>
    <SidebarItem>
      <SidebarH3>Talks</SidebarH3>
      <SidebarUl>
        <SidebarLi>
          <SidebarH4 className="print:text-xs">
            <ExternalLink href="http://talks.jamesdigioia.com/brookjs-at-reactnyc">
              Meet <code>brookjs</code>
            </ExternalLink>
          </SidebarH4>
        </SidebarLi>
        <SidebarLi>
          <SidebarH4 className="print:text-xs">
            <ExternalLink href="http://talks.jamesdigioia.com/using-vuejs-in-server-rendered-environments#/">
              Using Vue.js in Server Rendered Environments
            </ExternalLink>
          </SidebarH4>
        </SidebarLi>
        <SidebarLi>
          <SidebarH4 className="print:text-xs">
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
          <SidebarSubUl>
            <SidebarSubLi>
              Taught web development to students at under-resourced high schools
            </SidebarSubLi>
            <SidebarSubLi>Mentored student hackathon team</SidebarSubLi>
            <SidebarSubLi>
              Mentored interns on internal projects at Valtech Summer of 2017 &
              2018
            </SidebarSubLi>
          </SidebarSubUl>
        </SidebarLi>
      </SidebarUl>
    </SidebarItem>
    <SidebarItem>
      <SidebarH3>Skills</SidebarH3>
      <SidebarUl>
        {skills.edges.map(({ node }, key) => (
          <SidebarLi
            key={key}
            className={cc(['print:py-0', 'print:ml-1', 'print:inline'])}
          >
            <SidebarH4 className={cc(['print:inline', 'print:font-bold'])}>
              {node.name}
            </SidebarH4>
            <span className={cc(['hidden', 'print:inline'])}>, </span>
            {node.keywords?.join(', ')}
          </SidebarLi>
        ))}
      </SidebarUl>
    </SidebarItem>
  </div>
);

const Resume = ({ data }) => (
  <>
    <div className="bg-primary text-2xl print:text-base">
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
  </>
);

export const pageQuery = graphql`
  query ResumeQuery {
    allExperienceJson {
      edges {
        node {
          companyName
          description
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

export default Resume
  |> withSEO(() => ({
    title: 'Resume',
  }));
