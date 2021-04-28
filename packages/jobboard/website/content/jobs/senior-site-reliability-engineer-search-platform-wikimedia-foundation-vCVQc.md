---
title: "Senior Site Reliability Engineer"
location: "Remote"
host: "https://boards.greenhouse.io/wikimedia"
companyName: "Wikimedia Foundation"
url: "https://boards.greenhouse.io/wikimedia/jobs/2439659"
applyUrl: "https://boards.greenhouse.io/wikimedia/jobs/2439659#app"
timestamp: 1619568000000
hashtags: "#elasticsearch,#ansible,#hadoop,#puppet,#kubernetes,#operations,#management,#content,#monitoring,#finance"
jobType: "software"

companyWebsite: "https://boards.greenhouse.io/wikimedia"
summary: "Wikimedia Foundation is searching for a Senior Site Reliability Engineer that has experience as a Site Reliability Engineer."
summaryBackup: "To apply as a senior site reliability engineer at Wikimedia Foundation, you preferably need to have some knowledge of: #elasticsearch, #management, #ansible."
featured: 9
---

## Senior Site Reliability Engineer

## Summary

The Wikimedia Foundation is looking for a Senior Site Reliability Engineer to join our team, reporting to the Search Platform Engineering Manager. As the Senior Site Reliability Engineer, you will be responsible for supporting, maintaining and extending [Wikidata Query Service](https://www.mediawiki.org/wiki/Wikidata_Query_Service) (WDQS), the essential infrastructure that supports querying [Wikidata](https://en.wikipedia.org/wiki/Wikidata) and our [Search infrastructure](https://wikitech.wikimedia.org/wiki/Search), powering the searchbox on Wikipedias and other higher level features.

The [Search Platform team](https://www.mediawiki.org/wiki/Wikimedia_Search_Platform) is dedicated to “help people easily discover knowledge on Wikipedia and its sister projects by providing tools and infrastructure for casual readers and expert users with precise needs, while maintaining a strong emphasis on privacy.” We are a mixed-skill team composed of software engineers, a computational linguist, and a site reliability engineer. We are responsible for [Search](https://wikitech.wikimedia.org/wiki/Search) and the Wikidata Query Service. We are a fully remote team, [spread across UTC-8 to UTC+1 timezones](https://people.wikimedia.org/~tjones/tz/). When the world is not locked down by a pandemic, we see each other in person two or three times per year.

Wikidata Query Service is a [SPARQL](https://en.wikipedia.org/wiki/SPARQL) [endpoint](https://query.wikidata.org/), backed by a graph database (more precisely an RDF Triple Store) that is live updated from Wikidata. WDQS provides the means to query Wikidata, to ask questions that would otherwise be impossible to answer, and to provide the base infrastructure on which our community can build tools and bots to query and edit Wikidata. We’ve written a [great blog post](https://techblog.wikimedia.org/2020/03/24/computational-knowledge-wikidata-wikidata-query-service-and-women-who-are-mayors/) if you want more context.

Wikidata has recently [reached item number 10’000’000](https://diff.wikimedia.org/2020/10/06/wikidata-reaches-q100000000/). Our graph database contains almost 12 billion triples, and has grown by over 250 [million triples over the last three months](https://grafana.wikimedia.org/d/000000489/wikidata-query-service?viewPanel=7&orgId=1&refresh=1m&from=now-3M&to=now). This is one of the largest public SPARQL endpoints on the internet. You would be helping us support this rapid growth.

[CirrusSearch](https://www.mediawiki.org/wiki/Extension:CirrusSearch) is the Mediawiki extension, backed by [Elasticsearch](https://www.elastic.co/elasticsearch/), that provides Search capabilities to all of our wikis, serving around [2000 requests per second](https://grafana.wikimedia.org/d/000000455/elasticsearch-percentiles?viewPanel=47&orgId=1&var-cirrus_group=eqiad&var-cluster=elasticsearch&var-exported_cluster=production-search&var-smoothing=1). We do Machine Learning Ranking and other data centric approaches to Search, supported by [Kafka](http://kafka.apache.org/) and [Hadoop](http://hadoop.apache.org/).

Your job as part of this team would be to use your skills to help us maintain and scale the Wikidata Query Service and Search. Your first project is likely to be setting up an Apache Flink cluster on Kubernetes that will allow us to update Wikidata Query Service more efficiently. This platform has the potential to become our new standard for stateful stream processing across the Foundation.

Here are some examples of projects we have been (or still are) working on:

*   Rearchitecting and rewriting the update process that ships data from Wikidata to WDQS, introducing [Apache Flink](https://flink.apache.org/) as a stateful event processing framework.
*   Integrating [Wikidata and Search](https://www.mediawiki.org/wiki/Help:Extension:WikibaseCirrusSearch).
*   Maintaining the beta [Wikimedia Commons Query Service](https://lists.wikimedia.org/pipermail/wikidata/2020-July/014154.html) (WCQS) SPARQL endpoint and upgrading it to production status.
*   Rearchitecting our Elasticsearch cluster to allow for additional growth in the size of our indices, splitting into more independent Elasticsearch clusters.

## You are responsible for:

*   Deployment, scaling, monitoring, provisioning and support of our Search and SPARQL endpoints
*   Providing guidance and expertise to the team on productionizing our applications

## Skills and Experience:

*   Experience as a Site Reliability Engineer, experience working on bare metal is a plus.
*   Experience with Configuration Management Systems (Puppet, Ansible, …)
*   Experience in supporting highly available and high-traffic web-facing applications.
*   Be open to supporting JVM-based applications.
*   English language skills and ability to work independently, as an effective part of a globally distributed team.
*   B.S. or M.S. in Computer Science, related field, or equivalent in related work experience. Do not feel you need a degree to apply; we value hands-on experience most of all.

## Qualities that are important to us:  

*   Be passionate about [free culture / open source](https://meta.wikimedia.org/wiki/Wikimedia_Foundation_Guiding_Principles#Freedom_and_open_source)

## Additionally, we’d love it if you have:

*   Experience with search
*   Experience with graph databases, in particular RDF / SPARQL
*   Experience with event streaming platforms (Kafka or similar)

## The Wikimedia Foundation is... 

...the nonprofit organization that hosts and operates Wikipedia and the other Wikimedia free knowledge projects. Our vision is a world in which every single human can freely share in the sum of all knowledge. We believe that everyone has the potential to contribute something to our shared knowledge, and that everyone should be able to access that knowledge, free of interference. We host the Wikimedia projects, build software experiences for reading, contributing, and sharing Wikimedia content, support the volunteer communities and partners who make Wikimedia possible, and advocate for policies that enable Wikimedia and free knowledge to thrive. The Wikimedia Foundation is a charitable, not-for-profit organization that relies on donations. We receive financial support from millions of individuals around the world, with an average donation of about $15. We also receive donations through institutional grants and gifts. The Wikimedia Foundation is a United States 501(c)(3) tax-exempt organization with offices in San Francisco, California, USA.

**_As an equal opportunity employer, the Wikimedia Foundation values having a diverse workforce and continuously strives to maintain an inclusive and equitable workplace. We encourage people with a diverse range of backgrounds to apply. We do not discriminate against any person based upon their race, traits historically associated with race, religion, color, national origin, sex, pregnancy or related medical conditions, parental status, sexual orientation, gender identity, gender expression, age, status as a protected veteran, status as an individual with a disability, genetic information, or any other legally protected characteristics._**

**_If you are a qualified applicant requiring assistance or an accommodation to complete any step of the application process due to a disability, you may contact us at recruiting@wikimedia.org or (415) 839-6885._**

## U.S. Benefits & Perks\*

*   Fully paid medical, dental and vision coverage for employees and their eligible families (yes, fully paid premiums!)
*   The Wellness Program provides reimbursement for mind, body and soul activities such as fitness memberships, baby sitting, continuing education and much more
*   The 401(k) retirement plan offers matched contributions at 4% of annual salary
*   Flexible and generous time off - vacation, sick and volunteer days, plus 22 paid holidays - including the last week of the year.
*   Family friendly! 100% paid new parent leave for seven weeks plus an additional five weeks for pregnancy, flexible options to phase back in after leave, fully equipped lactation room.
*   For those emergency moments - long and short term disability, life insurance (2x salary) and an employee assistance program
*   Pre-tax savings plans for health care, child care, elder care, public transportation and parking expenses
*   Telecommuting and flexible work schedules available
*   Appropriate fuel for thinking and coding (aka, a pantry full of treats) and monthly massages to help staff relax
*   Paid travel to Wikimedia Foundation events all around the world!
*   Equipment including a laptop, monitor, plus a one-time stipend to cover any additional needs to make sure you have the best work experience
*   Great colleagues - diverse staff and contractors speaking dozens of languages from around the world, fantastic intellectual discourse, mission-driven and intensely passionate people

**_\*Please note that for remote roles located outside of the U.S., we defer to our PEO to ensure alignment with local labor laws._**

## More information

[**Wikimedia Foundation**](https://wikimediafoundation.org/)

[**Blog**](https://wikimediafoundation.org/news/)

[**Wikimedia 2030**](https://meta.wikimedia.org/wiki/Strategy/Wikimedia_movement/2017)

[**Wikimedia Medium Term Plan**](https://meta.wikimedia.org/wiki/Wikimedia_Foundation_Medium-term_plan_2019)

[**Our Commitment to Equity**](https://medium.com/freely-sharing-the-sum-of-all-knowledge/we-stand-for-racial-justice-49c31afbabca)

[**This is Wikimedia Foundation**](https://www.youtube.com/watch?v=OQzZI0l3IOw) 

[**Facts Matter**](https://www.youtube.com/watch?v=xQ4ba28-oGs)

[**Our Projects**](https://wikimediafoundation.org/wiki/Our_projects)

[**Our Tech Stack**](https://techblog.wikimedia.org/)



