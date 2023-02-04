import Link from 'next/link';
import { paramCase } from 'param-case';
import * as Prezis from '@talks/prezis';
import { getPagePropsBySlug } from '@tina/server';

const titleCase = text =>
  text
    .replace(/([A-Z])/g, ' $1')
    .replace(/(By|At|In|And|To|The|For|With)\s/g, word => word.toLowerCase())
    .replace(/(Reactnyc)/, () => 'ReactNYC')
    .replace(/(Brookjs)/, () => 'brookjs')
    .replace(/(Scripted)/, () => 'ScriptEd')
    .replace(/(Year1)/, () => 'Year 1')
    .replace(/(Vuejs)/, () => 'Vue.js')
    .replace(/(Wpgistpen)/, () => 'WP-Gistpen')
    .replace(/(Wordpress)/, () => 'WordPress')
    .replace(/(Rtl)/, () => 'RTL');

const TalkArchive = ({}) => {
  return (
    <div>
      <ul>
        {Object.entries(Prezis).map(([key]) => (
          <li key={key}>
            <Link href={`/talks/${paramCase(key)}`}>{titleCase(key)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: await getPagePropsBySlug('talks/__archive__'),
  };
};

export default TalkArchive;
