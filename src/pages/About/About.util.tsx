import dayjs from "dayjs";

import { Window, Button } from "components";
import {
  imgCollaborate,
  imgStockPhoto,
  imgStockPhoto2,
  imgStockPhoto3,
  imgStockPhoto4,
} from "assets";
import { downloadBase64 } from "utils";
import {
  GetSearchMedicalKeywords,
  GetSearchPublications,
  Publication,
} from "api/models";

import { CommonSection } from "pages/Dashboard/Home/components";
import { PublicationsSection } from "pages/Dashboard/Publications/components";

import { FeatureModel } from "./About.model";
import SingleResultMedical from "pages/Dashboard/Search/components/SearchResults/SingleResultMedical/SingleResultMedical";
import SingleResultPublication from "pages/Dashboard/Search/components/SearchResults/SingleResultPublication/SingleResultPublication";

export const getFeatureContent = (): FeatureModel[] => [
  {
    number: 1,
    tagline: "Consolidate",
    title: "Create your research profile",
    gradientStart: "gradientBlueStart",
    gradientEnd: "gradientBlueEnd",
    content: (
      <div className="flex flex-col w-full max-w-[1100px] lg:mt-[60px] ">
        <div className="flex flex-col mt-10 space-y-10 lg:space-y-0 lg:mt-0 lg:flex-row-reverse lg:space-x-10 lg:space-x-reverse">
          <div className="basis-1/2 flex flex-col space-y-5 px-5">
            <p className="text-center lg:text-left text-2xl font-semibold tracking-tight">
              Curate your research interests and patient pools
            </p>
            <p className="text-center lg:text-left text-lg">
              Populate your profile with your experience, research interests and
              patient pools for other researchers to see for potential
              connections
            </p>
          </div>

          <div className="basis-1/2">
            <Window>
              <div className="flex items-center sm:items-start flex-col sm:flex-row p-2 space-x-0 sm:space-x-6">
                <img
                  src={imgStockPhoto}
                  alt="profile"
                  className="object-cover min-h-[100px] min-w-[100px] max-h-[100px] max-w-[100px] border-2 border-white rounded-full ring-cyan-500 ring-2"
                />
                <div className="text-center sm:text-left mt-3 sm:mt-0">
                  <h1 className="text-2xl font-semibold">David Chen</h1>
                  <p className="pt-1">Senior Consultant</p>

                  <p className="pt-2 sm:pt-4 text-base">
                    Ophthalmology, ACME General Hospital
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-6">
                <CommonSection
                  title="Research Interests"
                  data={["Intracranial hypertension", "Teleophthalmology"]}
                />
                <CommonSection
                  title="Patient Populations"
                  data={["Glaucoma", "Amblyopia", "Strabismus"]}
                />
              </div>
            </Window>
          </div>
        </div>

        <span
          className={`w-[200px] my-[60px] lg:my-[60px] self-center text-white bg-black h-[1px] from-black to-white  bg-gradient-radial`}
        />

        <div className="flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:space-x-10">
          <div className="basis-1/2 flex px-5 flex-col items-center lg:items-start space-y-5">
            <p className="text-center lg:text-left text-2xl font-semibold tracking-tight">
              Import your publications from PubMed
            </p>
            <p className="text-center lg:text-left text-lg">
              Sync your publications from PubMed by simply providing your PubMed
              names.
            </p>
            <p className="text-center lg:text-left text-lg">
              You can also download the publications in your profile into a PDF
              for record keeping.
            </p>
            <div className="max-w-[200px]">
              <Button
                onClick={() => {
                  const data = getSampleBase64();
                  downloadBase64(
                    "pdf",
                    data,
                    `publications_${dayjs().format("YYYYMMDD")}.pdf`
                  );
                }}
                variant="secondary"
              >
                Download Sample PDF
              </Button>
            </div>
          </div>

          <div className="basis-1/2">
            <Window>
              <PublicationsSection
                data={getSamplePublications()}
                namesToBold={["chen dz"]}
                withHeader
              />
            </Window>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 2,
    tagline: "Connect",
    title: "Connect with like-minded researchers",
    gradientStart: "gradientPinkStart",
    gradientEnd: "gradientPinkEnd",
    content: (
      <div className="flex flex-col w-full max-w-[1100px] lg:mt-[60px] ">
        <div className="flex flex-col mt-10 space-y-10 lg:space-y-0 lg:mt-0 lg:flex-row-reverse lg:space-x-10 lg:space-x-reverse">
          <div className="basis-1/2 flex flex-col space-y-5 px-5">
            <p className="text-center lg:text-left text-2xl font-semibold tracking-tight">
              Find your next project team
            </p>
            <p className="text-center lg:text-left text-lg">
              Search for researchers with similar interest and desired expertise
              to aid in your next research projects or clinical trials
            </p>
            <p className="text-center lg:text-left text-lg">
              Gain insights into your department's research capabilities and
              help create potential collaborations for budding researchers
            </p>
          </div>

          <div className="basis-1/2">
            <Window>
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2 sm:ml-6">
                  <label>Search by medical keywords:</label>
                  <input
                    readOnly
                    value="Glaucoma"
                    className="mt-0 border-[1px] border-borderGray 
                    outline-none p-[10px] pb-[11px] rounded-md hover:ring-1 max-w-[300px]"
                  />
                </div>
                <SingleResultMedical
                  q="glaucoma"
                  data={getSampleMedicalKeywordResults()}
                  disabledLinks
                />
              </div>
            </Window>
          </div>
        </div>

        <span
          className={`w-[200px] my-[60px] lg:my-[60px] self-center text-white bg-black h-[1px] from-black to-white  bg-gradient-radial`}
        />

        <div className="flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:space-x-10">
          <div className="basis-1/2 flex px-5 flex-col items-center lg:items-start space-y-5">
            <p className="text-center lg:text-left text-2xl font-semibold tracking-tight">
              Tap into existing knowledge base
            </p>
            <p className="text-center lg:text-left text-lg">
              Search the database for researchers who have extensive experience
              and numerous publications in a given field
            </p>
          </div>

          <div className="basis-1/2">
            <Window>
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2 sm:ml-6">
                  <label>Search by keyword in publications:</label>
                  <input
                    readOnly
                    value="Glaucoma"
                    className="mt-0 border-[1px] border-borderGray 
                    outline-none p-[10px] pb-[11px] rounded-md hover:ring-1 max-w-[300px]"
                  />
                </div>
                <SingleResultPublication
                  q="glaucoma"
                  data={getSamplePublicationKeywordResults()}
                  disableLinks
                />
              </div>
            </Window>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 3,
    tagline: "Collaboration",
    title: "Take your research to new heights",
    gradientStart: "gradientOrangeStart",
    gradientEnd: "gradientOrangeEnd",
    content: (
      <div className="flex flex-col w-full max-w-[1100px] lg:mt-[60px] ">
        <div className="flex flex-col mt-10 space-y-10 lg:space-y-0 lg:mt-0 lg:flex-row-reverse lg:space-x-10 lg:space-x-reverse">
          <div className="basis-1/2">
            <div className="basis-1/2 flex px-5 flex-col items-center lg:items-start space-y-5">
              <p className="text-center lg:text-left text-2xl font-semibold tracking-tight">
                Find the right people for the your projects
              </p>
              <p className="text-center lg:text-left text-lg">
                Assemble an optimal team to give your research projects and
                clinical trials the best chance to succeed
              </p>
            </div>
          </div>

          <div className="basis-1/2 flex flex-col space-y-5 px-5">
            <img
              src={imgCollaborate}
              width="100%"
              height="100%"
              alt="collaborate"
            />
          </div>
        </div>
      </div>
    ),
  },
];

const getSamplePublications = (): Publication[] => [
  {
    id: "284",
    type: "publication",
    title:
      "Neuro-Behçet's disease presenting as isolated intracranial hypertension.",
    source: "Ann Acad Med Singap",
    pubType: ["Journal Article"],
    authors: ["Lin HA", "Chen DZ", "Tan CWT"],
    sortFirstAuthor: "Lin HA",
    elocationId: "doi: 10.47102/annals-acadmedsg.2020189",
    publishedAt: "2021-01-01T00:00:00.000+08:00",
    volume: "50",
    issue: "1",
    pages: "88-89",
    apiSource: "pubmed",
    externalId: "33623963",
    pmcId: null,
    nctId: null,
  },
  {
    id: "285",
    type: "publication",
    title:
      "Teleophthalmology and its evolving role in a COVID-19 pandemic: A scoping review.",
    source: "Ann Acad Med Singap",
    pubType: ["Journal Article", "Review"],
    authors: ["Chong JC", "Tan CHN", "Chen DZ"],
    sortFirstAuthor: "Chong JC",
    elocationId: "doi: 10.47102/annals-acadmedsg.2020459",
    publishedAt: "2021-01-01T00:00:00.000+08:00",
    volume: "50",
    issue: "1",
    pages: "61-76",
    apiSource: "pubmed",
    externalId: "33623959",
    pmcId: null,
    nctId: null,
  },
];

const getSampleMedicalKeywordResults = (): GetSearchMedicalKeywords.Data[] => [
  {
    id: "1",
    type: "searchMedicalKeywords",
    name: "Jessica Koh",
    image: imgStockPhoto3,
    designation: {
      id: "6",
      type: "designation",
      name: "Associate Consultant",
    },
    departments: [
      {
        id: "2",
        type: "department",
        name: "Opthalmology",
      },
    ],
    institution: {
      id: "1",
      type: "institution",
      name: "ACME General Hospital",
    },
    specialties: ["Cataract", "Myotonic dystrophy"],
    researchInterests: ["Glaucoma surgery", "Refractive surgery"],
    patientPools: ["Cataract"],
  },
  {
    id: "2",
    type: "searchMedicalKeywords",
    name: "Janice Wong",
    image: imgStockPhoto2,
    designation: {
      id: "6",
      type: "designation",
      name: "Associate Consultant",
    },
    departments: [
      {
        id: "2",
        type: "department",
        name: "Opthalmology",
      },
    ],
    institution: {
      id: "1",
      type: "institution",
      name: "ACME General Hospital",
    },
    specialties: ["Glaucoma", "Neuro-Ophthalmology"],
    researchInterests: ["Trabecular Meshwork"],
    patientPools: ["Glaucoma"],
  },
];

const getSamplePublicationKeywordResults = (): GetSearchPublications.Data[] => [
  {
    id: "10",
    type: "searchPublication",
    name: "William Prince",
    image: imgStockPhoto4,
    designation: {
      id: "6",
      type: "designation",
      name: "Associate Consultant",
    },
    departments: [
      {
        id: "2",
        type: "department",
        name: "Opthalmology",
      },
    ],
    institution: {
      id: "1",
      type: "institution",
      name: "ACME General Hospital",
    },
    publicationTitle:
      "Improvement in inner retinal function in glaucoma with nicotinamide (vitamin B3) supplementation: A crossover randomized clinical trial.",
    publicationAuthors: [
      "Hui F",
      "Tang J",
      "Willam PA",
      "Casson RJ",
      "Coote M",
    ],
    publicationSource: "Clin Exp Ophthalmol.",
    publicationVolume: "",
    publicationIssue: "",
    publicationPages: "1-12",
    publicationPublishedAt: "2022-09-13T16:00:00.000Z",
    publicationCount: 25,
  },
];

const getSampleBase64 = () => {
  return `JVBERi0xLjMKJf////8KMSAwIG9iago8PCAvQ3JlYXRvciA8ZmVmZjAwNTAw
    MDcyMDA2MTAwNzcwMDZlPgovUHJvZHVjZXIgPGZlZmYwMDUwMDA3MjAwNjEw
    MDc3MDA2ZT4KPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL0NhdGFsb2cK
    L1BhZ2VzIDMgMCBSCj4+CmVuZG9iagozIDAgb2JqCjw8IC9UeXBlIC9QYWdl
    cwovQ291bnQgMQovS2lkcyBbNSAwIFJdCj4+CmVuZG9iago0IDAgb2JqCjw8
    IC9MZW5ndGggMTQxNDUKPj4Kc3RyZWFtCnEKCkJUCjM2LjAgNzM2Ljg5MiBU
    ZAovRjIuMCAxMiBUZgo8NTA3NTYyNmM2OTYzNjE3NDY5NmY2ZTczPiBUagpF
    VAoKMSB3Ci9EZXZpY2VSR0IgQ1MKMC4wIDAuMCAwLjAgU0NOCjEgdwowLjAg
    MC4wIDAuMCBTQ04KCkJUCjUxLjAgNzA2LjgyMiBUZAovRjEuMCAxMCBUZgo8
    MzEyZT4gVGoKRVQKCjEgdwowLjAgMC4wIDAuMCBTQ04KCkJUCjcwLjQ2MjQy
    IDcwNi44MjIgVGQKL0YxLjAgMTAgVGYKPDQzNmY2ZDcwNmM2OTYzNjE3NDY5
    NmY2ZTczMjA2MTZlNjQyMDZmNzU3NDYzNmY2ZDY1NzMyMDZmNjYyMDcwNzI2
    OTZkNjE3Mjc5MjA3MDY4NjE2MzZmNzQ3MjYxNjI2NTYzNzU2YzY1NjM3NDZm
    NmQ3OTIwNzc2OTc0NjgyMDZkNjk3NDZmNmQ3OTYzNjk2ZTIwNDMyMDY5NmUy
    MDYxMjA2ZDc1NmM3NDY5MmQ2NTc0Njg2ZTY5NjM+IFRqCkVUCgoKQlQKNzAu
    NDYyNDIgNjkxLjMzMiBUZAovRjEuMCAxMCBUZgo8NjE3MzY5NjE2ZTIwNzA2
    ZjcwNzU2YzYxNzQ2OTZmNmUyZT4gVGoKRVQKCi9EZXZpY2VSR0IgY3MKMC40
    Mjc0NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0
    OSBTQ04KCkJUCjcwLjQ2MjQyIDY3NS44NDIgVGQKL0YyLjAgMTAgVGYKPDQz
    Njg2NTZlMjA0NDVhPiBUagpFVAoKNzAuNDYyNDIgNjc0LjU5MiBtCjExNy44
    MjI0MiA2NzQuNTkyIGwKUwowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAg
    c2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgc2NuCjAuNDI3NDUgMC40NDMx
    NCAwLjQ1NDkgU0NOCgpCVAoxMTcuODIyNDIgNjc1Ljg0MiBUZAovRjEuMCAx
    MCBUZgo8MmMyMD4gVGoKRVQKCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAu
    MCBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0NSAwLjQ0
    MzE0IDAuNDU0OSBTQ04KCkJUCjEyNC4xNjI0MiA2NzUuODQyIFRkCi9GMS4w
    IDEwIFRmCls8NGI+IDQ5LjgwNDY5IDw2ZjY4MjA1Nj5dIFRKCkVUCgoxMjQu
    MTYyNDIgNjc0LjU5MiBtCjE1Mi42NjQzNyA2NzQuNTkyIGwKUwowLjAgMC4w
    IDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1
    NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgU0NOCgpCVAoxNTIuNjY0
    MzcgNjc1Ljg0MiBUZAovRjEuMCAxMCBUZgo8MmMyMD4gVGoKRVQKCjAuMCAw
    LjAgMC4wIFNDTgowLjAgMC4wIDAuMCBzY24KMC40Mjc0NSAwLjQ0MzE0IDAu
    NDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjE1OS4w
    MDQzNyA2NzUuODQyIFRkCi9GMS4wIDEwIFRmCjw1MzZlNjcyMDQzPiBUagpF
    VAoKMTU5LjAwNDM3IDY3NC41OTIgbQoxODguMTY0MzcgNjc0LjU5MiBsClMK
    MC4wIDAuMCAwLjAgU0NOCjAuMCAwLjAgMC4wIHNjbgowLjQyNzQ1IDAuNDQz
    MTQgMC40NTQ5IHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IFNDTgoKQlQK
    MTg4LjE2NDM3IDY3NS44NDIgVGQKL0YxLjAgMTAgVGYKPDJjMjA+IFRqCkVU
    CgowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjAuNDI3NDUgMC40
    NDMxNCAwLjQ1NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgU0NOCgpC
    VAoxOTQuNTA0MzcgNjc1Ljg0MiBUZAovRjEuMCAxMCBUZgpbPDQxPiAxNy41
    NzgxMiA8NzE3NTY5NmU2ZjIwNGQ0Mz5dIFRKCkVUCgoxOTQuNTA0MzcgNjc0
    LjU5MiBtCjI0Ny44MTg1OSA2NzQuNTkyIGwKUwowLjAgMC4wIDAuMCBTQ04K
    MC4wIDAuMCAwLjAgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgc2NuCjAu
    NDI3NDUgMC40NDMxNCAwLjQ1NDkgU0NOCgpCVAoyNDcuODE4NTkgNjc1Ljg0
    MiBUZAovRjEuMCAxMCBUZgo8MmMyMD4gVGoKRVQKCjAuMCAwLjAgMC4wIFND
    TgowLjAgMC4wIDAuMCBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBzY24K
    MC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjI1NC4xNTg1OSA2NzUu
    ODQyIFRkCi9GMS4wIDEwIFRmCjw0MzY4NjU3NzIwNTA+IFRqCkVUCgoyNTQu
    MTU4NTkgNjc0LjU5MiBtCjI5MC45ODg1OSA2NzQuNTkyIGwKUwowLjAgMC4w
    IDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1
    NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgU0NOCgpCVAoyOTAuOTg4
    NTkgNjc1Ljg0MiBUZAovRjEuMCAxMCBUZgo8MmU+IFRqCkVUCgowLjAgMC4w
    IDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCgpCVAoyOTQuMTU4NTkgNjc1Ljg0
    MiBUZApFVAoKMC4xNjA3OCAwLjU0NTEgMC4zMDU4OCBzY24KMC4xNjA3OCAw
    LjU0NTEgMC4zMDU4OCBTQ04KCkJUCjcwLjQ2MjQyIDY2MC4zNTIgVGQKL0Yx
    LjAgMTAgVGYKWzw1MDRjPiAxNy41NzgxMiA8NmY1MzIwNGY2ZTY1MmUyMDRk
    NjE3MjIwMzIzMDMxMzUzYjIwMzEzMDI4MzMyOTNhNjUzMDMxMzEzODM4MzUz
    Mj5dIFRKCkVUCgowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCgpC
    VAoyNTkuMDk2NjQgNjYwLjM1MiBUZApFVAoKMC4yIDAuNCAwLjggc2NuCjAu
    MiAwLjQgMC44IFNDTgoKQlQKNzAuNDYyNDIgNjQ0Ljg2MiBUZAovRjEuMCAx
    MCBUZgpbPDY0NmY2OTNhMjAzMTMwMmUzMTMzMzczMTJmNmE2Zjc1NzI+IDE3
    LjU3ODEyIDw2ZTYxNmMyZTcwNmY2ZTY1MmUzMDMxMzEzODM4MzUzMj5dIFRK
    CkVUCgowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjEgdwowLjAg
    MC4wIDAuMCBTQ04KMSB3CjAuMCAwLjAgMC4wIFNDTgoKQlQKNTEuMCA2MTIu
    ODcyIFRkCi9GMS4wIDEwIFRmCjwzMjJlPiBUagpFVAoKMSB3CjAuMCAwLjAg
    MC4wIFNDTgoKQlQKNzAuNDYyNDIgNjEyLjg3MiBUZAovRjEuMCAxMCBUZgpb
    PDUzNjE2NjY1NzQ3OTIwNjE2ZTY0MjA0NTY2NjY2OTYzNjE2Mzc5MjA2ZjY2
    MjA0ZDY5NjM3Mj4gMjEuOTcyNjYgPDZmNjk2ZTc2NjE3MzY5NzY2NTIwNDc2
    YzYxNzU2MzZmNmQ2MTIwNTM3NTcyPiAxNy41NzgxMiA8Njc2NTcyNzk+IDE0
    Mi41NzgxMiA8MmU+XSBUSgpFVAoKMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBz
    Y24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjcwLjQ2MjQyIDU5
    Ny4zODIgVGQKL0YyLjAgMTAgVGYKPDQzNjg2NTZlMjA0NDVhPiBUagpFVAoK
    NzAuNDYyNDIgNTk2LjEzMiBtCjExNy44MjI0MiA1OTYuMTMyIGwKUwowLjAg
    MC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjAuNDI3NDUgMC40NDMxNCAw
    LjQ1NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgU0NOCgpCVAoxMTcu
    ODIyNDIgNTk3LjM4MiBUZAovRjEuMCAxMCBUZgo8MmMyMD4gVGoKRVQKCjAu
    MCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBzY24KMC40Mjc0NSAwLjQ0MzE0
    IDAuNDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjEy
    NC4xNjI0MiA1OTcuMzgyIFRkCi9GMS4wIDEwIFRmCjw1MzZlNjcyMDQzNDM0
    MT4gVGoKRVQKCjEyNC4xNjI0MiA1OTYuMTMyIG0KMTY3LjE0MjQyIDU5Ni4x
    MzIgbApTCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBzY24KMC40Mjc0
    NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBT
    Q04KCkJUCjE2Ny4xNDI0MiA1OTcuMzgyIFRkCi9GMS4wIDEwIFRmCjwyZT4g
    VGoKRVQKCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBzY24KCkJUCjE3
    MC4zMTI0MiA1OTcuMzgyIFRkCkVUCgowLjE2MDc4IDAuNTQ1MSAwLjMwNTg4
    IHNjbgowLjE2MDc4IDAuNTQ1MSAwLjMwNTg4IFNDTgoKQlQKNzAuNDYyNDIg
    NTgxLjg5MiBUZAovRjEuMCAxMCBUZgo8NGEyMDRmNzA2ODc0Njg2MTZjNmQ2
    ZjZjMmUyMDRhNjE2ZTIwMzIzMDMxMzczYjIwMzIzMDMxMzczYTMzMzEzODMy
    MzkzMzM1PiBUagpFVAoKMC4wIDAuMCAwLjAgU0NOCjAuMCAwLjAgMC4wIHNj
    bgoKQlQKMjY1LjA2MjQyIDU4MS44OTIgVGQKRVQKCjAuMiAwLjQgMC44IHNj
    bgowLjIgMC40IDAuOCBTQ04KCkJUCjcwLjQ2MjQyIDU2Ni40MDIgVGQKL0Yx
    LjAgMTAgVGYKPDY0NmY2OTNhMjAzMTMwMmUzMTMxMzUzNTJmMzIzMDMxMzcy
    ZjMzMzEzODMyMzkzMzM1PiBUagpFVAoKMC4wIDAuMCAwLjAgU0NOCjAuMCAw
    LjAgMC4wIHNjbgoxIHcKMC4wIDAuMCAwLjAgU0NOCjEgdwowLjAgMC4wIDAu
    MCBTQ04KCkJUCjUxLjAgNTM0LjQxMiBUZAovRjEuMCAxMCBUZgo8MzMyZT4g
    VGoKRVQKCjEgdwowLjAgMC4wIDAuMCBTQ04KCkJUCjcwLjQ2MjQyIDUzNC40
    MTIgVGQKL0YxLjAgMTAgVGYKWzw1MD4gMzUuNjQ0NTMgPDY1NzI2OTcwNjg2
    NTcyNjE2YzIwNzI+IDIxLjk3MjY2IDw2NTc0Njk2ZTYxNmMyMDYzNjg2MTZl
    Njc2NTczMjA2OTZlMjA2ODY5Njc2ODZjNzkyMDZkNzk2ZjcwNjk2MzIwNzk2
    Zjc1NmU2NzIwNDE3MzY5NjE2ZTIwNjU3OTY1NzMyZT5dIFRKCkVUCgowLjQy
    NzQ1IDAuNDQzMTQgMC40NTQ5IHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5
    IFNDTgoKQlQKNzAuNDYyNDIgNTE4LjkyMiBUZAovRjIuMCAxMCBUZgo8NDM2
    ODY1NmUyMDQ0NWE+IFRqCkVUCgo3MC40NjI0MiA1MTcuNjcyIG0KMTE3Ljgy
    MjQyIDUxNy42NzIgbApTCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBz
    Y24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0
    IDAuNDU0OSBTQ04KCkJUCjExNy44MjI0MiA1MTguOTIyIFRkCi9GMS4wIDEw
    IFRmCjwyYzIwPiBUagpFVAoKMC4wIDAuMCAwLjAgU0NOCjAuMCAwLjAgMC4w
    IHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IHNjbgowLjQyNzQ1IDAuNDQz
    MTQgMC40NTQ5IFNDTgoKQlQKMTI0LjE2MjQyIDUxOC45MjIgVGQKL0YxLjAg
    MTAgVGYKWzw0Yj4gNDkuODA0NjkgPDZmNjgyMDU2Pl0gVEoKRVQKCjEyNC4x
    NjI0MiA1MTcuNjcyIG0KMTUyLjY2NDM3IDUxNy42NzIgbApTCjAuMCAwLjAg
    MC4wIFNDTgowLjAgMC4wIDAuMCBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0
    OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjE1Mi42NjQz
    NyA1MTguOTIyIFRkCi9GMS4wIDEwIFRmCjwyYzIwPiBUagpFVAoKMC4wIDAu
    MCAwLjAgU0NOCjAuMCAwLjAgMC4wIHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40
    NTQ5IHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IFNDTgoKQlQKMTU5LjAw
    NDM3IDUxOC45MjIgVGQKL0YxLjAgMTAgVGYKWzw1ND4gMTY1LjUyNzM0IDw2
    MTZlMjA0ZD5dIFRKCkVUCgoxNTkuMDA0MzcgNTE3LjY3MiBtCjE4Ny42ODkx
    IDUxNy42NzIgbApTCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBzY24K
    MC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAu
    NDU0OSBTQ04KCkJUCjE4Ny42ODkxIDUxOC45MjIgVGQKL0YxLjAgMTAgVGYK
    PDJjMjA+IFRqCkVUCgowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2Nu
    CjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAw
    LjQ1NDkgU0NOCgpCVAoxOTQuMDI5MSA1MTguOTIyIFRkCi9GMS4wIDEwIFRm
    Cls8NTQ+IDE2NS41MjczNCA8NjE2ZTIwNDM1Mz5dIFRKCkVUCgoxOTQuMDI5
    MSA1MTcuNjcyIG0KMjI3LjQxMzgzIDUxNy42NzIgbApTCjAuMCAwLjAgMC4w
    IFNDTgowLjAgMC4wIDAuMCBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBz
    Y24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjIyNy40MTM4MyA1
    MTguOTIyIFRkCi9GMS4wIDEwIFRmCjwyYzIwPiBUagpFVAoKMC4wIDAuMCAw
    LjAgU0NOCjAuMCAwLjAgMC4wIHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5
    IHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IFNDTgoKQlQKMjMzLjc1Mzgz
    IDUxOC45MjIgVGQKL0YxLjAgMTAgVGYKPDRlNjE2ODIwNDc+IFRqCkVUCgoy
    MzMuNzUzODMgNTE3LjY3MiBtCjI2NC41OTM4MyA1MTcuNjcyIGwKUwowLjAg
    MC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjAuNDI3NDUgMC40NDMxNCAw
    LjQ1NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgU0NOCgpCVAoyNjQu
    NTkzODMgNTE4LjkyMiBUZAovRjEuMCAxMCBUZgo8MmMyMD4gVGoKRVQKCjAu
    MCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBzY24KMC40Mjc0NSAwLjQ0MzE0
    IDAuNDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjI3
    MC45MzM4MyA1MTguOTIyIFRkCi9GMS4wIDEwIFRmCjw1MzY4NjU2ZTIwNGM+
    IFRqCkVUCgoyNzAuOTMzODMgNTE3LjY3MiBtCjMwNC44MjM4MyA1MTcuNjcy
    IGwKUwowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjAuNDI3NDUg
    MC40NDMxNCAwLjQ1NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgU0NO
    CgpCVAozMDQuODIzODMgNTE4LjkyMiBUZAovRjEuMCAxMCBUZgo8MmMyMD4g
    VGoKRVQKCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBzY24KMC40Mjc0
    NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBT
    Q04KCkJUCjMxMS4xNjM4MyA1MTguOTIyIFRkCi9GMS4wIDEwIFRmCls8NDI2
    ODYxNzI+IDE3LjU3ODEyIDw2NzYxNzY2MTIwNGQ+XSBUSgpFVAoKMzExLjE2
    MzgzIDUxNy42NzIgbQozNzAuNjg4MDQgNTE3LjY3MiBsClMKMC4wIDAuMCAw
    LjAgU0NOCjAuMCAwLjAgMC4wIHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5
    IHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IFNDTgoKQlQKMzcwLjY4ODA0
    IDUxOC45MjIgVGQKL0YxLjAgMTAgVGYKPDJjMjA+IFRqCkVUCgowLjAgMC4w
    IDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1
    NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgU0NOCgpCVAozNzcuMDI4
    MDQgNTE4LjkyMiBUZAovRjEuMCAxMCBUZgpbPDQzNjg2NTZlNjcyMDQzPiAx
    Ny41NzgxMiA8NTk+XSBUSgpFVAoKMzc3LjAyODA0IDUxNy42NzIgbQo0MjUu
    MjMyMjYgNTE3LjY3MiBsClMKMC4wIDAuMCAwLjAgU0NOCjAuMCAwLjAgMC4w
    IHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IHNjbgowLjQyNzQ1IDAuNDQz
    MTQgMC40NTQ5IFNDTgoKQlQKNDI1LjIzMjI2IDUxOC45MjIgVGQKL0YxLjAg
    MTAgVGYKPDJjMjA+IFRqCkVUCgowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAw
    LjAgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgc2NuCjAuNDI3NDUgMC40
    NDMxNCAwLjQ1NDkgU0NOCgpCVAo0MzEuNTcyMjYgNTE4LjkyMiBUZAovRjEu
    MCAxMCBUZgo8NWE2ODYxNmYyMDUwPiBUagpFVAoKNDMxLjU3MjI2IDUxNy42
    NzIgbQo0NjYuMTgyMjYgNTE3LjY3MiBsClMKMC4wIDAuMCAwLjAgU0NOCjAu
    MCAwLjAgMC4wIHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IHNjbgowLjQy
    NzQ1IDAuNDQzMTQgMC40NTQ5IFNDTgoKQlQKNDY2LjE4MjI2IDUxOC45MjIg
    VGQKL0YxLjAgMTAgVGYKPDJjMjA+IFRqCkVUCgowLjAgMC4wIDAuMCBTQ04K
    MC4wIDAuMCAwLjAgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgc2NuCjAu
    NDI3NDUgMC40NDMxNCAwLjQ1NDkgU0NOCgpCVAo0NzIuNTIyMjYgNTE4Ljky
    MiBUZAovRjEuMCAxMCBUZgpbPDU3PiA1OC41OTM3NSA8NmY2ZTY3MjA1NDU5
    Pl0gVEoKRVQKCjQ3Mi41MjIyNiA1MTcuNjcyIG0KNTE1Ljk2NjMzIDUxNy42
    NzIgbApTCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBzY24KMC40Mjc0
    NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBT
    Q04KCkJUCjUxNS45NjYzMyA1MTguOTIyIFRkCi9GMS4wIDEwIFRmCjwyYzIw
    PiBUagpFVAoKMC4wIDAuMCAwLjAgU0NOCjAuMCAwLjAgMC4wIHNjbgowLjQy
    NzQ1IDAuNDQzMTQgMC40NTQ5IHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5
    IFNDTgoKQlQKNTIyLjMwNjMzIDUxOC45MjIgVGQKL0YxLjAgMTAgVGYKPDUz
    NjE3NzIwNTM0ZD4gVGoKRVQKCjUyMi4zMDYzMyA1MTcuNjcyIG0KNTYxLjA2
    NjMzIDUxNy42NzIgbApTCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBz
    Y24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0
    IDAuNDU0OSBTQ04KCkJUCjU2MS4wNjYzMyA1MTguOTIyIFRkCi9GMS4wIDEw
    IFRmCjwyZT4gVGoKRVQKCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBz
    Y24KCkJUCjU2NC4yMzYzMyA1MTguOTIyIFRkCkVUCgowLjE2MDc4IDAuNTQ1
    MSAwLjMwNTg4IHNjbgowLjE2MDc4IDAuNTQ1MSAwLjMwNTg4IFNDTgoKQlQK
    NzAuNDYyNDIgNTAzLjQzMiBUZAovRjEuMCAxMCBUZgpbPDQxPiAxNy41Nzgx
    MiA8NjM3NDYxMjA0ZjcwNjg3NDY4NjE2YzZkNmY2YzJlMjA0ZTZmNzYyMDMy
    MzAzMTM4M2IyMDM5MzYyODM3MjkzYTY1MzgzNDM2MmQ2NTM4MzUzMT5dIFRK
    CkVUCgowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCgpCVAoyOTku
    NDA2NjQgNTAzLjQzMiBUZApFVAoKMC4yIDAuNCAwLjggc2NuCjAuMiAwLjQg
    MC44IFNDTgoKQlQKNzAuNDYyNDIgNDg3Ljk0MiBUZAovRjEuMCAxMCBUZgo8
    NjQ2ZjY5M2EyMDMxMzAyZTMxMzEzMTMxMmY2MTZmNzMyZTMxMzMzNzM1MzI+
    IFRqCkVUCgowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjEgdwow
    LjAgMC4wIDAuMCBTQ04KMSB3CjAuMCAwLjAgMC4wIFNDTgoKQlQKNTEuMCA0
    NTUuOTUyIFRkCi9GMS4wIDEwIFRmCjwzNDJlPiBUagpFVAoKMSB3CjAuMCAw
    LjAgMC4wIFNDTgoKQlQKNzAuNDYyNDIgNDU1Ljk1MiBUZAovRjEuMCAxMCBU
    ZgpbPDRlNjU3NTcyPiAyMS45NzI2NiA8NmY+IC0xOC41NTQ2OSA8MmQ+IDM1
    LjY0NDUzIDw0MjY1Njg4ZDY1NzQyNzczMjA2NDY5NzM2NTYxNzM2NTIwNzA3
    Mj4gMjEuOTcyNjYgPDY1NzM2NTZlNzQ2OTZlNjcyMDYxNzMyMDY5NzM2ZjZj
    NjE3NDY1NjQyMDY5NmU3NDcyNjE2MzcyNjE2ZTY5NjE2YzIwNjg3OTcwNjU3
    Mjc0NjU2ZTczNjk2ZjZlMmU+XSBUSgpFVAoKMC40Mjc0NSAwLjQ0MzE0IDAu
    NDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjcwLjQ2
    MjQyIDQ0MC40NjIgVGQKL0YxLjAgMTAgVGYKPDRjNjk2ZTIwNDg0MT4gVGoK
    RVQKCjcwLjQ2MjQyIDQzOS4yMTIgbQoxMDIuNjUyNDIgNDM5LjIxMiBsClMK
    MC4wIDAuMCAwLjAgU0NOCjAuMCAwLjAgMC4wIHNjbgowLjQyNzQ1IDAuNDQz
    MTQgMC40NTQ5IHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IFNDTgoKQlQK
    MTAyLjY1MjQyIDQ0MC40NjIgVGQKL0YxLjAgMTAgVGYKPDJjMjA+IFRqCkVU
    CgowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjAuNDI3NDUgMC40
    NDMxNCAwLjQ1NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgU0NOCgpC
    VAoxMDguOTkyNDIgNDQwLjQ2MiBUZAovRjIuMCAxMCBUZgo8NDM2ODY1NmUy
    MDQ0NWE+IFRqCkVUCgoxMDguOTkyNDIgNDM5LjIxMiBtCjE1Ni4zNTI0MiA0
    MzkuMjEyIGwKUwowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjAu
    NDI3NDUgMC40NDMxNCAwLjQ1NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1
    NDkgU0NOCgpCVAoxNTYuMzUyNDIgNDQwLjQ2MiBUZAovRjEuMCAxMCBUZgo8
    MmMyMD4gVGoKRVQKCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBzY24K
    MC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAu
    NDU0OSBTQ04KCkJUCjE2Mi42OTI0MiA0NDAuNDYyIFRkCi9GMS4wIDEwIFRm
    Cls8NTQ+IDE2NS41MjczNCA8NjE2ZTIwNDM1NzU0Pl0gVEoKRVQKCjE2Mi42
    OTI0MiA0MzkuMjEyIG0KMjA1LjcxNzE1IDQzOS4yMTIgbApTCjAuMCAwLjAg
    MC4wIFNDTgowLjAgMC4wIDAuMCBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0
    OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjIwNS43MTcx
    NSA0NDAuNDYyIFRkCi9GMS4wIDEwIFRmCjwyZT4gVGoKRVQKCjAuMCAwLjAg
    MC4wIFNDTgowLjAgMC4wIDAuMCBzY24KCkJUCjIwOC44ODcxNSA0NDAuNDYy
    IFRkCkVUCgowLjE2MDc4IDAuNTQ1MSAwLjMwNTg4IHNjbgowLjE2MDc4IDAu
    NTQ1MSAwLjMwNTg4IFNDTgoKQlQKNzAuNDYyNDIgNDI0Ljk3MiBUZAovRjEu
    MCAxMCBUZgpbPDQxNmU2ZTIwNDE+IDE3LjU3ODEyIDw2MzYxNjQyMDRkNjU2
    NDIwNTM2OTZlNjc2MTcwMmUyMDRhNjE2ZTIwMzIzMDMyMzEzYjIwMzUzMDI4
    MzEyOTNhMzgzODJkMzgzOT5dIFRKCkVUCgowLjAgMC4wIDAuMCBTQ04KMC4w
    IDAuMCAwLjAgc2NuCgpCVAoyOTUuNTg2NjQgNDI0Ljk3MiBUZApFVAoKMC4y
    IDAuNCAwLjggc2NuCjAuMiAwLjQgMC44IFNDTgoKQlQKNzAuNDYyNDIgNDA5
    LjQ4MiBUZAovRjEuMCAxMCBUZgo8NjQ2ZjY5M2EyMDMxMzAyZTM0MzczMTMw
    MzIyZjYxNmU2ZTYxNmM3MzJkNjE2MzYxNjQ2ZDY1NjQ3MzY3MmUzMjMwMzIz
    MDMxMzgzOT4gVGoKRVQKCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBz
    Y24KMSB3CjAuMCAwLjAgMC4wIFNDTgoxIHcKMC4wIDAuMCAwLjAgU0NOCgpC
    VAo1MS4wIDM3Ny40OTIgVGQKL0YxLjAgMTAgVGYKPDM1MmU+IFRqCkVUCgox
    IHcKMC4wIDAuMCAwLjAgU0NOCgpCVAo3MC40NjI0MiAzNzcuNDkyIFRkCi9G
    MS4wIDEwIFRmCls8NTQ+IDE2OS45MjE4OCA8NjU2YzY1NmY3MDY4NzQ2ODYx
    NmM2ZDZmNmM2ZjY3NzkyMDYxNmU2NDIwNjk3NDczMjA2NTc2NmY2Yzc2Njk2
    ZTY3MjA3Mj4gMjEuOTcyNjYgPDZmNmM2NTIwNjk2ZTIwNjEyMDQzNGY+IDE3
    LjU3ODEyIDw1NjQ5NDQyZDMxMzkyMDcwNjE2ZTY0NjU2ZDY5NjMzYTIwNDEy
    MDczNjM2ZjcwNjk2ZTY3MjA3Mj4gMjEuOTcyNjYgPDY1NzY2OTY1Nzc+IDkx
    Ljc5Njg4IDwyZT5dIFRKCkVUCgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IHNj
    bgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IFNDTgoKQlQKNzAuNDYyNDIgMzYy
    LjAwMiBUZAovRjEuMCAxMCBUZgo8NDM2ODZmNmU2NzIwNGE0Mz4gVGoKRVQK
    CjcwLjQ2MjQyIDM2MC43NTIgbQoxMTUuNjQyNDIgMzYwLjc1MiBsClMKMC4w
    IDAuMCAwLjAgU0NOCjAuMCAwLjAgMC4wIHNjbgowLjQyNzQ1IDAuNDQzMTQg
    MC40NTQ5IHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IFNDTgoKQlQKMTE1
    LjY0MjQyIDM2Mi4wMDIgVGQKL0YxLjAgMTAgVGYKPDJjMjA+IFRqCkVUCgow
    LjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjAuNDI3NDUgMC40NDMx
    NCAwLjQ1NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgU0NOCgpCVAox
    MjEuOTgyNDIgMzYyLjAwMiBUZAovRjEuMCAxMCBUZgpbPDU0PiAxNjUuNTI3
    MzQgPDYxNmUyMDQzNDg0ZT5dIFRKCkVUCgoxMjEuOTgyNDIgMzYwLjc1MiBt
    CjE2NC4wMTcxNSAzNjAuNzUyIGwKUwowLjAgMC4wIDAuMCBTQ04KMC4wIDAu
    MCAwLjAgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgc2NuCjAuNDI3NDUg
    MC40NDMxNCAwLjQ1NDkgU0NOCgpCVAoxNjQuMDE3MTUgMzYyLjAwMiBUZAov
    RjEuMCAxMCBUZgo8MmMyMD4gVGoKRVQKCjAuMCAwLjAgMC4wIFNDTgowLjAg
    MC4wIDAuMCBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0
    NSAwLjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjE3MC4zNTcxNSAzNjIuMDAyIFRk
    Ci9GMi4wIDEwIFRmCjw0MzY4NjU2ZTIwNDQ1YT4gVGoKRVQKCjE3MC4zNTcx
    NSAzNjAuNzUyIG0KMjE3LjcxNzE1IDM2MC43NTIgbApTCjAuMCAwLjAgMC4w
    IFNDTgowLjAgMC4wIDAuMCBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBz
    Y24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjIxNy43MTcxNSAz
    NjIuMDAyIFRkCi9GMS4wIDEwIFRmCjwyZT4gVGoKRVQKCjAuMCAwLjAgMC4w
    IFNDTgowLjAgMC4wIDAuMCBzY24KCkJUCjIyMC44ODcxNSAzNjIuMDAyIFRk
    CkVUCgowLjE2MDc4IDAuNTQ1MSAwLjMwNTg4IHNjbgowLjE2MDc4IDAuNTQ1
    MSAwLjMwNTg4IFNDTgoKQlQKNzAuNDYyNDIgMzQ2LjUxMiBUZAovRjEuMCAx
    MCBUZgpbPDQxNmU2ZTIwNDE+IDE3LjU3ODEyIDw2MzYxNjQyMDRkNjU2NDIw
    NTM2OTZlNjc2MTcwMmUyMDRhNjE2ZTIwMzIzMDMyMzEzYjIwMzUzMDI4MzEy
    OTNhMzYzMTJkMzczNj5dIFRKCkVUCgowLjAgMC4wIDAuMCBTQ04KMC4wIDAu
    MCAwLjAgc2NuCgpCVAoyOTUuNTg2NjQgMzQ2LjUxMiBUZApFVAoKMC4yIDAu
    NCAwLjggc2NuCjAuMiAwLjQgMC44IFNDTgoKQlQKNzAuNDYyNDIgMzMxLjAy
    MiBUZAovRjEuMCAxMCBUZgo8NjQ2ZjY5M2EyMDMxMzAyZTM0MzczMTMwMzIy
    ZjYxNmU2ZTYxNmM3MzJkNjE2MzYxNjQ2ZDY1NjQ3MzY3MmUzMjMwMzIzMDM0
    MzUzOT4gVGoKRVQKCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBzY24K
    MSB3CjAuMCAwLjAgMC4wIFNDTgoxIHcKMC4wIDAuMCAwLjAgU0NOCgpCVAo1
    MS4wIDI5OS4wMzIgVGQKL0YxLjAgMTAgVGYKPDM2MmU+IFRqCkVUCgoxIHcK
    MC4wIDAuMCAwLjAgU0NOCgpCVAo3MC40NjI0MiAyOTkuMDMyIFRkCi9GMS4w
    IDEwIFRmCls8NDQ2MTcyNjE3NDc1NmQ3NTZkNjE2MjJkNjk2ZTY0NzU2MzY1
    NjQyMDc0NzI2MTZlNzM2OTY1NmU3NDIwNmQ3OTZmNzA2OTYzMjA3MzY4Njk2
    Nj4gMTcuNTc4MTIgPDc0MjA2MTZlNjQyMDY5NzQ3MzIwNzA3Mj4gMjEuOTcy
    NjYgPDZmNzA2ZjczNjU2NDIwNmQ2NTYzNjg2MTZlNjk3MzZkNzMyZT5dIFRK
    CkVUCgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IHNjbgowLjQyNzQ1IDAuNDQz
    MTQgMC40NTQ5IFNDTgoKQlQKNzAuNDYyNDIgMjgzLjU0MiBUZAovRjIuMCAx
    MCBUZgo8NDM2ODY1NmUyMDQ0NWE+IFRqCkVUCgo3MC40NjI0MiAyODIuMjky
    IG0KMTE3LjgyMjQyIDI4Mi4yOTIgbApTCjAuMCAwLjAgMC4wIFNDTgowLjAg
    MC4wIDAuMCBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0
    NSAwLjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjExNy44MjI0MiAyODMuNTQyIFRk
    Ci9GMS4wIDEwIFRmCjwyYzIwPiBUagpFVAoKMC4wIDAuMCAwLjAgU0NOCjAu
    MCAwLjAgMC4wIHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IHNjbgowLjQy
    NzQ1IDAuNDQzMTQgMC40NTQ5IFNDTgoKQlQKMTI0LjE2MjQyIDI4My41NDIg
    VGQKL0YxLjAgMTAgVGYKWzw0MT4gMTcuNTc4MTIgPDcxNzU2OTZlNmYyMDRk
    NDM0ND5dIFRKCkVUCgoxMjQuMTYyNDIgMjgyLjI5MiBtCjE4NS4xNzY2NCAy
    ODIuMjkyIGwKUwowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjAu
    NDI3NDUgMC40NDMxNCAwLjQ1NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAwLjQ1
    NDkgU0NOCgpCVAoxODUuMTc2NjQgMjgzLjU0MiBUZAovRjEuMCAxMCBUZgo8
    MmMyMD4gVGoKRVQKCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4wIDAuMCBzY24K
    MC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0NSAwLjQ0MzE0IDAu
    NDU0OSBTQ04KCkJUCjE5MS41MTY2NCAyODMuNTQyIFRkCi9GMS4wIDEwIFRm
    Cjw0MzY4NmU2NzIwNTc0YT4gVGoKRVQKCjE5MS41MTY2NCAyODIuMjkyIG0K
    MjMzLjQ4NjY0IDI4Mi4yOTIgbApTCjAuMCAwLjAgMC4wIFNDTgowLjAgMC4w
    IDAuMCBzY24KMC40Mjc0NSAwLjQ0MzE0IDAuNDU0OSBzY24KMC40Mjc0NSAw
    LjQ0MzE0IDAuNDU0OSBTQ04KCkJUCjIzMy40ODY2NCAyODMuNTQyIFRkCi9G
    MS4wIDEwIFRmCjwyYzIwPiBUagpFVAoKMC4wIDAuMCAwLjAgU0NOCjAuMCAw
    LjAgMC4wIHNjbgowLjQyNzQ1IDAuNDQzMTQgMC40NTQ5IHNjbgowLjQyNzQ1
    IDAuNDQzMTQgMC40NTQ5IFNDTgoKQlQKMjM5LjgyNjY0IDI4My41NDIgVGQK
    L0YxLjAgMTAgVGYKWzw0Yj4gNDkuODA0NjkgPDZmNjgyMDU2NTQ+IDU4LjU5
    Mzc1IDw0Mz5dIFRKCkVUCgoyMzkuODI2NjQgMjgyLjI5MiBtCjI4MC44MjI2
    NSAyODIuMjkyIGwKUwowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2Nu
    CjAuNDI3NDUgMC40NDMxNCAwLjQ1NDkgc2NuCjAuNDI3NDUgMC40NDMxNCAw
    LjQ1NDkgU0NOCgpCVAoyODAuODIyNjUgMjgzLjU0MiBUZAovRjEuMCAxMCBU
    Zgo8MmU+IFRqCkVUCgowLjAgMC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2Nu
    CgpCVAoyODMuOTkyNjUgMjgzLjU0MiBUZApFVAoKMC4xNjA3OCAwLjU0NTEg
    MC4zMDU4OCBzY24KMC4xNjA3OCAwLjU0NTEgMC4zMDU4OCBTQ04KCkJUCjcw
    LjQ2MjQyIDI2OC4wNTIgVGQKL0YxLjAgMTAgVGYKPDQzNmM2OTZlMjA0NTc4
    NzAyMDRmNzA2ODc0Njg2MTZjNmQ2ZjZjMmUyMDRhNjE2ZTIwMzIzMDMyMzEz
    YjIwMzQzOTI4MzEyOTNhMzgzMTJkMzgzMz4gVGoKRVQKCjAuMCAwLjAgMC4w
    IFNDTgowLjAgMC4wIDAuMCBzY24KCkJUCjI4OC42NjI0MiAyNjguMDUyIFRk
    CkVUCgowLjIgMC40IDAuOCBzY24KMC4yIDAuNCAwLjggU0NOCgpCVAo3MC40
    NjI0MiAyNTIuNTYyIFRkCi9GMS4wIDEwIFRmCls8NjQ2ZjY5M2EyMDMxMzAy
    ZTMxMzEzMTMxMmY2MzY1NmY+IDE3LjU3ODEyIDwyZTMxMzMzODM3MzQ+XSBU
    SgpFVAoKMC4wIDAuMCAwLjAgU0NOCjAuMCAwLjAgMC4wIHNjbgpRCgplbmRz
    dHJlYW0KZW5kb2JqCjUgMCBvYmoKPDwgL1R5cGUgL1BhZ2UKL1BhcmVudCAz
    IDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ3JvcEJveCBbMCAwIDYx
    MiA3OTJdCi9CbGVlZEJveCBbMCAwIDYxMiA3OTJdCi9UcmltQm94IFswIDAg
    NjEyIDc5Ml0KL0FydEJveCBbMCAwIDYxMiA3OTJdCi9Db250ZW50cyA0IDAg
    UgovUmVzb3VyY2VzIDw8IC9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIg
    L0ltYWdlQyAvSW1hZ2VJXQovRm9udCA8PCAvRjIuMCA2IDAgUgovRjEuMCA3
    IDAgUgo+Pgo+PgovQW5ub3RzIFs4IDAgUiA5IDAgUiAxMCAwIFIgMTEgMCBS
    IDEyIDAgUiAxMyAwIFJdCj4+CmVuZG9iago2IDAgb2JqCjw8IC9UeXBlIC9G
    b250Ci9CYXNlRm9udCAvNGNjNzRkK0RlamFWdVNhbnMtQm9sZAovU3VidHlw
    ZSAvVHJ1ZVR5cGUKL0ZvbnREZXNjcmlwdG9yIDE1IDAgUgovRmlyc3RDaGFy
    IDMyCi9MYXN0Q2hhciAyNTUKL1dpZHRocyAxNyAwIFIKL1RvVW5pY29kZSAx
    NiAwIFIKPj4KZW5kb2JqCjcgMCBvYmoKPDwgL1R5cGUgL0ZvbnQKL0Jhc2VG
    b250IC8wZjhlOGMrRGVqYVZ1U2FucwovU3VidHlwZSAvVHJ1ZVR5cGUKL0Zv
    bnREZXNjcmlwdG9yIDE5IDAgUgovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAy
    NTUKL1dpZHRocyAyMSAwIFIKL1RvVW5pY29kZSAyMCAwIFIKPj4KZW5kb2Jq
    CjggMCBvYmoKPDwgL0JvcmRlciBbMCAwIDBdCi9BIDw8IC9UeXBlIC9BY3Rp
    b24KL1MgL1VSSQovVVJJIChodHRwczovL2RvaS5vcmcvZG9pOiAxMC4xMzcx
    L2pvdXJuYWwucG9uZS4wMTE4ODUyKQo+PgovU3VidHlwZSAvTGluawovUmVj
    dCBbNzAuNDYyNDIgNjQyLjQ2MiAyNDcuMDU2NjQgNjUyLjQ1Ml0KL1R5cGUg
    L0Fubm90Cj4+CmVuZG9iago5IDAgb2JqCjw8IC9Cb3JkZXIgWzAgMCAwXQov
    QSA8PCAvVHlwZSAvQWN0aW9uCi9TIC9VUkkKL1VSSSAoaHR0cHM6Ly9kb2ku
    b3JnL2RvaTogMTAuMTE1NS8yMDE3LzMxODI5MzUpCj4+Ci9TdWJ0eXBlIC9M
    aW5rCi9SZWN0IFs3MC40NjI0MiA1NjQuMDAyIDIxMC4yMjI0MiA1NzMuOTky
    XQovVHlwZSAvQW5ub3QKPj4KZW5kb2JqCjEwIDAgb2JqCjw8IC9Cb3JkZXIg
    WzAgMCAwXQovQSA8PCAvVHlwZSAvQWN0aW9uCi9TIC9VUkkKL1VSSSAoaHR0
    cHM6Ly9kb2kub3JnL2RvaTogMTAuMTExMS9hb3MuMTM3NTIpCj4+Ci9TdWJ0
    eXBlIC9MaW5rCi9SZWN0IFs3MC40NjI0MiA0ODUuNTQyIDE4OS4zMDI0MiA0
    OTUuNTMyXQovVHlwZSAvQW5ub3QKPj4KZW5kb2JqCjExIDAgb2JqCjw8IC9C
    b3JkZXIgWzAgMCAwXQovQSA8PCAvVHlwZSAvQWN0aW9uCi9TIC9VUkkKL1VS
    SSAoaHR0cHM6Ly9kb2kub3JnL2RvaTogMTAuNDcxMDIvYW5uYWxzLWFjYWRt
    ZWRzZy4yMDIwMTg5KQo+PgovU3VidHlwZSAvTGluawovUmVjdCBbNzAuNDYy
    NDIgNDA3LjA4MiAyODUuMjYyNDIgNDE3LjA3Ml0KL1R5cGUgL0Fubm90Cj4+
    CmVuZG9iagoxMiAwIG9iago8PCAvQm9yZGVyIFswIDAgMF0KL0EgPDwgL1R5
    cGUgL0FjdGlvbgovUyAvVVJJCi9VUkkgKGh0dHBzOi8vZG9pLm9yZy9kb2k6
    IDEwLjQ3MTAyL2FubmFscy1hY2FkbWVkc2cuMjAyMDQ1OSkKPj4KL1N1YnR5
    cGUgL0xpbmsKL1JlY3QgWzcwLjQ2MjQyIDMyOC42MjIgMjg1LjI2MjQyIDMz
    OC42MTJdCi9UeXBlIC9Bbm5vdAo+PgplbmRvYmoKMTMgMCBvYmoKPDwgL0Jv
    cmRlciBbMCAwIDBdCi9BIDw8IC9UeXBlIC9BY3Rpb24KL1MgL1VSSQovVVJJ
    IChodHRwczovL2RvaS5vcmcvZG9pOiAxMC4xMTExL2Nlby4xMzg3NCkKPj4K
    L1N1YnR5cGUgL0xpbmsKL1JlY3QgWzcwLjQ2MjQyIDI1MC4xNjIgMTg5LjQ0
    NjY0IDI2MC4xNTJdCi9UeXBlIC9Bbm5vdAo+PgplbmRvYmoKMTQgMCBvYmoK
    PDwgL0xlbmd0aDEgMjE4NTYKL0xlbmd0aCA4NDk2Ci9GaWx0ZXIgWy9GbGF0
    ZURlY29kZV0KPj4Kc3RyZWFtCnic7XwLfBTltfg3c2Y2m0k22U12A0kgmSSG
    x3XZQHhJENklWUIgJCFZXiqazT7IQvbh7oZILYq31/bWaq3XliI+eGjVVlSK
    VBHQotLrE8UKta1ar3+12hqt/160uMXhnu+b2UdCQAR8/P+/myEz33zf+c77
    nO/MQSQcISSPrCVAOls7ampXVtz4LiFcN84u8gTdkeIxNRcQwutxrsCzKi5f
    8MgEHOdEcM7ljywPXsSv/IgQGIHwW5e7YxGShRdZ6ML33OU9q/0bxVkvEmLo
    J0Sa1O1zew25ZAGu4TuZ0o0ThntEQNzn4Ps53cH45Ut/pb8a3/fi+5yesMc9
    rNL8Q9y/D99HBd2XR3SLdeNwfQ6+yyF30PfxlT/mCRkuE3L++5FwLM69xK9F
    +rm4PjsS9UW+7d6C8sDThGTdTais/CU7r/zhz2ovzT//Y1KOouDPy0+c+2nq
    Waqs003TmRFWXaQ/uC8rqIwkRHcnvtXopjFMmT8FbKYAWsi55HKSS3hiJHaK
    QfyAr8CnQDjhJ/weIuLMRPFmRFmmPuEV4ucLkK0cPYBO4HlhEGbS5nd6iYxX
    r86smLkNWUHuLTm1KuzH/c8g1jeIH7nbI76Ov/vJxaKfLBF3ka3CY/gM4u92
    spV/TP2lY/EqskR4kqyAl0kpvm9iUqpSoe443WAujv8ZrIIhfnjIeEkLJqoP
    XZaeZKNf5FCShjycyTeaPh/pV/fzcJZOFIDniFU2buOrm7zb7AuWyE8vrRhn
    HfQqG7PkbaRtm2G1vPPYsbYlQqm4dJs4YhtU67cJ1VVvnmjxzXHWeW1L5J3c
    GGeDhtbZ2YCTHUtwSN9wGuedDWyNUt0mVuOfps5tsqdbvtZ4bVXdtUZf3TjH
    v/FruVFEIcBVExPez+EqSB0RMbIS+FZFivBeqc1VMjg6Bk5m6+VkN97LiBfv
    I9nqCFKM91JShvcSNlPM7sPZfRi7F7G7hTNjBhE5C3ujY+AK2biA3fO5PLIG
    1/PZGx0DZ+ByyXU4Z2BzBrKXCFwul0OW4hxdAbyvxbkcTiKjcI6uAN7tOEdn
    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
    ee6gkPe84aC02SRsHoZmKsmaZSDm6QPj+/CHxo+RsUtLr6KxzbF41nQ51ZQR
    6cLkppta19199zrXT+2u+xYrLym/4BZxNUvuFWYor9WOf+C22x6onaC8Wl7O
    TcXvSws3tTzlQ6Ik0MxZSurtFcTyey77ef1BcWMu98rwjQXP5q4fUWrh9RYD
    aeAN+dNHoNYO9+9DJ1EZfJtx+CHNPiNnjqQcWirKuIHMyURUrSxKR3cbbr3u
    sg/WXKVcpRxQHuDm4Re0npuh/Kivs/tfjfxE/5VX1jco/eMncJO5YXi21ClP
    3ORf0xtS9bcVY7AAlTmMTLYPN+AhJ71acMDyrPGOPI43kEaTwZBvpIlIter5
    /YffZnlg/I7O4rXFTHsVk02TRo1WdYjJuIL6XW2RWKCsNxgtc2yRtdSMCx4K
    PfEM/4vPFoW5m28KlVSNvu/mz/6gM392T9eyD1Ufwxvlg+b8sfY83evkQeEO
    Hr+9BWLUG4+e31+rxb09uy27MzuSvTZboPmHUazYyvkpFWWD0PnPTTqz8lpS
    Ng1n2cPkDh6/4I0CikIRUTRipxgR14oaGoZCZ/60P0MvaMPBenlwaL28/fl6
    sXyOXm65MakXofNOVS2aL41GPnKQk3H2Qt3mArI599mC9cOzZ+U3wyzLdPWU
    0Fz7w/EPTS2cWdxYCBn5AcMOkl6Dd/7xvjVr+nq//e1eroJzKruVN5Q/KY9w
    jXDFvZs330t/OaI8rfTj9TR3HmfG6zxVJysw1rqQl9HkNbvdkMvn5UwpKy8T
    dVn6bFGQppSXl1VLOWXlgoXFofl5y8HhG03CxmqMwzFlUk55aRbpKG3PM2e1
    Vc4fQ/Plwf630etZwlQj82MamQXDpqnZPe8D07Bp2mNp5XZ9Dp449kuys7Ol
    7Jyc3BxDdr5YVZJbYijJG55v1duybZItx5ZrM4yVp+mnZ0+XpufU5dYZ5mXP
    lebmzM2dY+jL7TPs0u/K3iXtytmVu8tQnafLy8rT52XnSYacqYaZYy8dm72M
    ZCSEck4ooscbZikTi0BUZQ1n4yZPmoKmFIbFfnep3zPPPZMrfEw5oiTCH6xZ
    +WY8sKIpOPNvew8f9fwR88RH48dPnHyuLSe7atO9D+6oquKMkybVTRtfY9CX
    bfnZ9q1lVK+lWGndKd6OJ3DQXpIn6vNhs4l7UL+ZSPqcbD5bIAZjQZ4LT+F5
    2/Jd87YZXRfN22aitwLXRUseIXnEft7S8/cdPX/fvgJ29uzrP4zxgu44nrMP
    n0lmFtIyG/KN+aY2vg3aLJ18J6iC0uAxF03HAZ4dpirTRBM/kbtMueGCi3cq
    +w/+cvt28XbliWNEqW6Zeoz88iD3KlZ/FzBf2IR+qRM6WV1Vmo8nde6r5gPD
    1hu5Bwt0PCnMN5gaMU6MJSy31bLcVvN2bTpKStfS3IvVG1YvqOlhqnopQ+pJ
    tonr5vNMRY0YJzQwF/wq+MRz3A5+a+Qi5QPb9/pKq0ZtvZkf+89NW7RIKeZq
    U83e9STZ+OUwbtZrY54I5A5tDMRI7tbGmGDIw9pYJLnkKW2sI0XkZW2sJyb8
    FlLHOWQkSWhjQ8Ft3DBtnEcmFe7QxkaSU/ieNjYRofC/Ca1lspGh8YX/0MYc
    KbKM1sY80VtmaGMgssWpjQUc+7SxSIZbrtHGelJpuU0b55A6y6+1saG6zvKp
    Ns4j3dMnamMjKZp+izY2Ef30X9aHI6ujgeXdcXmMZ6xci04qd62WZwXisXjU
    5w5a5aaQxyY7enrkdgoVk9t9MV90lc9rk47bOoVudblXBVeEQ8vlWe7uE2xs
    8K1wL+qVPd3u0HJfTHZHfXIgJEd6u3oCHtkbDroDoSRMhzsUmxXu8Wa8ykO9
    L/JFY4FwSK61TZw6yeOZOsl7rgpCIcZl7PCHQ8hLHEXrjscjdTU1Xpxf1WuL
    hXujHp8/HF3us4V88dkMjHJGZUupQx4T8/nkLl9PuG+sTT4FOWxyY8/qSHdM
    DgQj4Wjc55X90XBQdkR9qzRWkjSY3npVvWWSkaQ0dZTSLauspZQvjTvpj3S8
    mU7ZwvIgyoGY5JbjUbfXF3RHV8ph/2AsktTmiwYDMWaKQEzu9kV9SGt51B1C
    0a0oO4qF21BjqGerHA/L7tBqOYLGww3hrjhqLIAqcMseZFpCyHi3L6knjycc
    jCA4BYh3I3bUsi8UQ+1VMpVUjkVkXtkdi4U9Afy68UresKc36AvF3XHKjz/Q
    g0YaQzGyDXJH2B/vQ/VXjmWcRH2RaNjb6/ExNN4AChbo6o37KA/SgA1WNLOn
    p9dLOekLxLvDvXFkJhjQCFEKUVWViLY3hvBUHKsc9FGpJeYgsW5rBg0rpVkT
    jsoxH9oBoQPIqib+INKUOUQboYqOS6rqGKG+bnSs4zZQM/h7oyEk6GMbvWE5
    FrbKsd6uFT5PnM5Q+fzhHnQ2KpAnHPIGqByxOklyITp3V3iVj0mgehFjIOUE
    oXAczRBTZ6lVImkPUNfkWLe7p0fq8mlaQzYwStwD5AyH0C+icjAc9Q0pthxf
    HfH53UjIpjI1cDXoXo3Rgtu9AX+AOpq7J46uhwNE6vZ6meSq6miAuqPIV2+P
    OypRQl5fLLA8xNhYrsYqbqIe6vYgkhjdkeQnNpgSRSkhAaYwd8/QCLQ9ST7S
    2JC9UM9qOZDh5hIVJ+qjf1fMYOkgRhVJ7ZIMDx/6nC/KNvWFo96YXJmKw0pK
    O7kgVdKwrWQqQ8s0a/HS5cNIolh70QZUJ6vCgRRjvsvjGDGyOxLB8HJ39fjo
    gio7YqYDKW2Ubndc7nbHEKMvNEAn1OvS3u2Ve0NejeE0qxJjTpXwZFaNYfLG
    qGZmo0Zyyz00e2CsJAEjbs9K93IUDOMwFJaoq34xpxpAChMWsujr8VOm5jjl
    2a0tLrmjdbZrsaPdKTd1yG3trYuaGpwNcqWjA98rrfLiJtec1oUuGSHaHS2u
    pXLrbNnRslSe19TSYJWdS9ranR0dUmu73DS/rbnJiXNNLfXNCxuaWhrlWbiv
    pdUlNzfNb3IhUlcr26qhanJ2UGTzne31c/DVMaupucm11CrNbnK1IE5krl12
    yG2OdldT/cJmR7vctrC9rbXDiTgaEG1LU8vsdqTinO9EIRBRfWvb0vamxjku
    K25y4aRVcrU7GpzzHe3zrDIia0WR22UGYkMuEYfsXEQ3d8xxNDfLs5pcHa52
    p2M+haXaaWxpne+UZrcubGlwuJpaW+RZThTFMavZqfKGotQ3O5rmW+UGx3xH
    IxUnSYSCqeKk1SHRDY3OFme7o9kqd7Q565voAPXY1O6sdzFI1D1qopmxW9/a
    0uFcsBAnEC5JwiotnuNkJFAAB/6pZ5wx8VtQXIrH1druSrGyuKnDaZUd7U0d
    1CKz21uRXWrP1tnMAxaiPqnxWjR+qY3o3PHegVB0tyZgg9PRjAg7KBs4IQ2A
    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
    SCuzI5Wnge2nVOcxKJWzVs3KdJzGYtN0qfJB9b8oRbmDyd+Ml8zkd+GMi9nG
    gfiTeJO+08gwUL4lpo2FTD4H00MrozCLwVEtUn02pzyuPcMq9Uxf1G6U8wZG
    ycE00jGkJElsmdYZyjukFIVGJp+TaaqZQXegHp0I35SaUf2xiclar+laxan6
    veoTzRnarWcyUssuQKpOzaccTHcDpaB2Wsz4T0uhWsCh3eszdJa2fotm3SQ/
    LkbZNYRWFrNYdDIoB7N1RypGZrP4na9xvjDlYekcsFDzz9YUZwP1m4yjJNyp
    5A4VV5L2QAs2MH9q1jjsSGlDhZBOglfNXU481zzsOyeeytsDT+7MqjFdjWbW
    ndaMXJtZCahZuJHBBgfBpWfVryX1zEp/62TWbkN9YSe/jtVaPln1pqsPNXer
    30SZVa+X1edqDRhLVSVhVgeGU5VJH1tNn+kRrXcSHvCdRym72dlvTdFKnkVp
    XGpd6WbVAqUWG0KbJz6hpOO+DCPsvFep9LFxXKtMqHy9Giyd/9agr+Fk/+d4
    G8hD2iApy1CVQ6b+o8zeEe1bKsA0TOtJm4Y3SpLfZWmdUA2ofbXgIKunvY9i
    qyODuwpUB8szOPcyXUtE7dFRmhLLV8ke19ffdTrbfdlvUj9IGtAPGlx5fXn9
    IGnIfpD8FfeDpFPqBw2s5D0ZPKV7HUnIU+ugDtVhkb62vpJ8XF9J+t++UkZf
    Kd1h+H+zryQNOGG/vr6SNMTX2jehryQN2VdKS/TV9JWkk/QLvpq+kkS+aF8p
    /bdOZ7OvlI63gX2lE52+J+4uqd/naiXxTesuSWRgd2no7sZX012STqJdOUOD
    3+wuk8R87Phq5qvvMknf4C6TNKjLlP7W/Sq7TNLndpnkr6zLJH2BLpP8pXWZ
    JKaDRYh1LuNW1bYD17+63pE0pM2/rt6RdFzvSP7aekfSCXtH6R7Ql987kr5A
    7+hkeL/c3lEys574RDm+4yOdRscns0tzNjs+0hl1fI7/Zju9jo+U0fE5Wd/h
    bHRo4sfht5N0p0FidOib7Qz+m6sappeV+FvDePOyqsnG6tcIzg2sxk7+35wR
    Xv1HzseuJBcO+T+ELGD/vnkUGU0mkhksUGZjUMxDIq2YZtoR7WI8BNV/Ea0n
    /LFjBP4HhIhtrwplbmRzdHJlYW0KZW5kb2JqCjE1IDAgb2JqCjw8IC9UeXBl
    IC9Gb250RGVzY3JpcHRvcgovRm9udE5hbWUgLzRjYzc0ZCtEZWphVnVTYW5z
    LUJvbGQKL0ZvbnRGaWxlMiAxNCAwIFIKL0ZvbnRCQm94IFstMTA2OSAtNDE1
    IDE5NzUgMTE3NF0KL0ZsYWdzIDQKL1N0ZW1WIDAKL0l0YWxpY0FuZ2xlIDAK
    L0FzY2VudCA3NTkKL0Rlc2NlbnQgLTI0MAovQ2FwSGVpZ2h0IDc1OQovWEhl
    aWdodCAwCj4+CmVuZG9iagoxNiAwIG9iago8PCAvTGVuZ3RoIDEyNzgKL0Zp
    bHRlciBbL0ZsYXRlRGVjb2RlXQo+PgpzdHJlYW0KeJxl18tu20YYhuG9rkLL
    dBFIcyYBw0CRbrzoAXV7AXN0BNSSICsL3335vROkaWvAxi+JnHm+X8Mhffj0
    9NPT+XTfH367Xepzv+/H6dxu/e3y5Vb7vvSX03ln7L6d6v3rK/7W13zdHbaT
    n9/f7v316Twu+4eH3eH37cO3++19/+HHdin9h93h11vrt9P5Zf/hz0/P2+vn
    L9frX/21n+/74+7xcd/62Ab6OV9/ya99f+C0j09t+/x0f/+4nfPPEX+8X/ve
    8tpMTL20/nbNtd/y+aXvHo7Hx4cxHnf93P7zkTke5yll1M/5Ng89bj+PW2ko
    jUpLaVU6SqfSU3qVgTKojJRRZaJMKhfKReVKuarMlFlloSwqK2VV2Sibyk7Z
    VQ7KLdGDwWvkNXiNvAavkdfgNfIavEZeg9fIa/AaeQ1eI6/Ba+Q1eI28Bq+R
    1+A18hq8Rl6D18hr8Bp5DV4jr8Vr5bV4rbwWr5XX4rXyWrxWXovXymvxWnkt
    XiuvxWvltXitvBavldfitfJavFZei9fKa/FaeS1eK6/D6+R1eJ28Dq+T1+F1
    8jq8Tl6H18nr8Dp5HV4nr8Pr5HV4nbwOr5PX4XXyOrxOXofXyevwOnkdXiev
    x+vl9Xi9vB6vl9fj9fJ6vF5ej9fL6/F6eT1eL6/H6+X1eL28Hq+X1+P18nq8
    Xl6P18vr8Xp5PV4vb8Ab5A14g7wBb5A34A3yBrxB3oA3yBvwBnkD3iBvwBvk
    DXiDvAFvkDfgDfIGvEHegDfIG/AGeQPeIG/EG+WNeKO8EW+UN+Ld/mq3+bqr
    /G+XiSSJShJJEpUkkiQqSSRJVJJIkqgkkSRRSSJJopJEkkQliSSJShJJEpUk
    kiQqSSRJVJJEkqQkiSRJSRJJkpIkkiR1PuFN8ia8Sd6EN8mb8CZ5E94kb8Kb
    5E14k7wJb5I34U3yJrxJ3oQ3yZvwJnkXvFWGBW+VYcFbNfGCt2q2BW9ToAVv
    E3LB2zTbgrdzAN6uPix4u8IveDuz4e3qw4K3MzHezsR4OxPj7Qq/4u1KvOLt
    Srzi7Yq54u3irHi7Eq94uxKveIeQK94hw4p3CLniHUKueIdirniHkCvegQHv
    EHLFO+DgHTLkzWvnzpzxFkq8WbNlvFmGjDcrfA6cxgF4iwwZb1OKjDcrW8ab
    Zcib15p5Gt6iFBlvVvvy5rWWCy3jrYyLt+mAIq/l/lKmV40qltM0WHGU6kOZ
    Xkr6WyijDuCuXhKDMcLCu6IXeV2VochruX0UvFlNLXgLZSOQkGWuB8rZX3kr
    66Fo3Io3a7Y6+6svoOLl5lrlNatkVf21bLx1ejVupb9b577bZUL49yZTaXwR
    ebso9CVxJgslK1MlCPEqQaq+28pCaWpQVRDDNlwHpQ5oLBSeKLYrTKW63Syl
    gjRHqTXePKX0jYXCY0SbC1vLp6nxoSp0mwtbDWpqvGEPaWr8vEm12XjKqne5
    Z7ZGyQibdxSe2Lalp1L0Phe23u1zoWjiPr06rU+vVlLHy+2+s1AqI+AF2Wl8
    ZTC8Vf3tLOwqb6e/VeH77C/jzv4qW6e/VY3qLJSmTva5sJVtgGyaeLA6miYe
    XH1Ns425uyn8ENLwTDKEtFwlQ0jLRjfm1aeJx8q7Qo5MyQiFkinmauaAxrtK
    MTolEw+mSN+vOj1T66n/27N6/XK7bY/p/GvA87mezE/n/u2/h+vlqrP0+zex
    2fAcCmVuZHN0cmVhbQplbmRvYmoKMTcgMCBvYmoKWzM0OCA2MDAgNjAwIDYw
    MCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAw
    IDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAg
    NjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNzMzIDgzMCA2
    MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDcz
    MiA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA3MjUgNjAw
    IDYwMCA2MDAgNjAwIDYwMCA2MDAgNjc0IDcxNSA1OTIgNjAwIDY3OCA2MDAg
    NjAwIDcxMSAzNDIgNjAwIDYwMCAzNDIgNjAwIDcxMSA2ODcgNjAwIDYwMCA2
    MDAgNTk1IDQ3OCA3MTEgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYw
    MCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAw
    IDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAg
    NjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2
    MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYw
    MCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAw
    IDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAg
    NjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2
    MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYw
    MCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAw
    IDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAg
    NjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2
    MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDBdCmVuZG9iagoxOCAwIG9iago8
    PCAvTGVuZ3RoMSAzMDMwMAovTGVuZ3RoIDE0ODA3Ci9GaWx0ZXIgWy9GbGF0
    ZURlY29kZV0KPj4Kc3RyZWFtCnic7XwLXFRV/vg599x7Z+bOe2BA3peXiCIQ
    iIpaDggIikiAqJXFyAyCCUMMqGQtPlbJtFVTsMyUSl2zMrK20Ky1sszMfam7
    P3fbX1tZ1i8zt5+7tQqX//ecO8NDrW2rffw+nz/T5Z577jnf9+t8B0MYIWRC
    SxFBFdNLU9Jqvlz3AEK4GmbLK2ud9YFiwAaEuF/BnK1yYaOMaiIyEdJ9Bc9K
    Vf282jtGLZyPEDkD65+Y5/TWIw180MJieDbMW9BcdSLipW4Y/hihpFnVbqfL
    +L8oGN6dg2t0NUyYnhRlgBUHz3HVtY2LxzwccwyeD8FlWeCpdJbeNvm/ENID
    PnRvrXNxPf+MeAe8y4dnuc5Z687TpfwJobHvIDThzXqPt1GTpklBqGkHvN9T
    3+CuH6/5Mwz59QgJ1Yjyyt3aZc/Er9xmnvAXFKVF9OfEqyO6/ffedqVcs0sM
    hEf1Jf2BfZpaJQJ+f9Lb3ntKs4tBGviTw2ZySBkagaqRAXHIgh6kEHg7FwR3
    HmHehNcjAehIFx4EkJHqnfwOVXE2IEsvEqLlOY6/AjIqrsp1IQeS0X1ioBKI
    t2hq8Qdy31v+OOxfA/vT0eskCnXCtQOet3EfIBfc/8DtA4zBqBWu9+Bqh2sr
    XC64tsG1Dq7dcK2BaxmsvQDXNqEZWYS70VGhHXnFRLib0FExHcY8OsrdQq/e
    dmEiOso3wfxZeN8N90Lk5U/AOBC18h/0XqIwNJ+gHBh3C0vQLfxZtATeHeCr
    0B1wv4M/h+7gfo1S6FiwoQNcJnqFy+z9A71rjqEDdI7/kK09QNeQKfA8AnlI
    LBoD7/byB9H14hpUDvfxdEzhgpBjmbZU7RhgKF4pzat/fKrkCEheEDVanaQ3
    GE1mi9UWEMje2IOCh4Sg0LDwiMgoOToGUMTFo6EJaFiiunP4iKSRySmp16Wl
    o1EZo8eMzRw3fsL1N0x0ZF0DWfbfp+eH/3lBIwo84TBKki2dXHyBq9Nx4yz5
    zdnRI5OueJQtGrkTFXcam+Wu3t7iWXyYMLtTCO8k8dpOPj72va97+d7IpKnF
    s+TOntwcH9TcihyYK50FQ/oE0zCfm8PeUaSdQjz8V1DRKVdWy/da7o0dd6/F
    PW4k6uKWOnovK+RSIPlbPPkqjXzZTv5qIn9RyEWF/G88+cJE/txOLsSTz+/N
    Ej5XyPl28lk7OXeJfHqJ/I9CPhlHPs4mZxXyURr58Eyp8GE7OQMLz5SSD95P
    ET64RN5PIe8p5E8KeTeN/Hcg+WM7eUchf7CR399NTr9I/kshv4Xlv72bnDo5
    WTh1Nzk5mZz4TZhwQiG/CSO/VsivFPJLhfxCIcfbydvHIoW3FXIskryVRo4q
    5I2VVuGNcPJ6EDmskNcU8qpCXlHIIYX8XCEvK+QlhRxUyIsKOWAl+1fFC/sV
    0vXCi0KXQl54fo7wwovkhaX88z+LF56f4+glzzv4n8WT5xTybDvZp5BnFNKp
    kKcVstdFnjKRJ5+IF550kSf22IQn4skeG3kciH78EtmtkJ8qZJdCdtrIDoU8
    9qhJeCyNPGoij7hIByzpaCfbFbLtYYOwTSEPG8jWh0KErS7y0BaL8FAI2WIh
    D0rkAYVsbjcKmxXSbiRtsKmtnWzaaBI2DSMbTeT+S2TD+heFDQpZv26OsP5F
    sn4pv+4n8cK6OWSdg/9JPLlPIWvXJAtrFbImmdwLbN6bRVbfoxdWB5J79KQV
    JlpdZBVIalU8WWklP1bIiuVWYYVCllvJMoUsVUiLQhy9P7r7buFHCrn7bnKX
    iywpswtL4smdCmlWyGITWWQgCyXSpJDGS8R7iTRcIndcIvUK8SikTiELosnt
    CplvzRbml5IahVTfTebBQ5VC3ApxKaRSIXMV4hxHKi6RWw1kjkJuVshNCpk9
    SxJmXyKzJDIzKESYmUbKFTIDMM/IJmV2UootQukQUhJIbpwSINyokGI9ma6Q
    omkWoUgh0yykUCFT4c1UhUwpsAhTAkhBhFEosJB8I5mskLx2kttOchQyiRsp
    TLpEsl8kWVOJQyETFXLD9TbhhkBy/QSzcL2NTBhvFCY4es1kvJGMU0imQsaO
    CRTGXiJjRluEMYFkdIZeGG0hGXoyKpKkG0nadXohTSHX6Ulqil5INZIUPUke
    qROSLWSkjiSlkRHD44URLjI80SYMjyeJNjIsIV4YlkUS4snQeL0w1Ezi9SRO
    IbEKiTGTaOAz2kZkF4m6RCKBhUgXiTCScJBguELCLpHQbBICDyEKGeIiwSCp
    YIUEwaagEGJXSKBCAhRigwU2hViBV2s2sdxNzC5iUojRECQYFWKA1YYgoleI
    ZCE6hWhhmVYhmkAiuggPL3mwADuBWaJA1LII3EiCLQQpBHdh18r78Ij/Cz/o
    303AN/5E4AzUhY7B5xW0B23Fu+CpClLFHTDTATXAStQEM6/hY3g1NxLmdqEL
    6ASsbEXHyB7Is1NQOswidFrg0EVchp4DGJk4EGdqoEjgi/jn+BK+iz8L1ckY
    3ssf5yt4L04njwrlwi64MsnrUPMcRVGoC7+LvOgA+YSkk4N8Dm9C75LjZA/6
    ELDQSugYWod2oCVASyD2oBZuCVcCM0eE42gLfDzw/jjehk8AdQfwCnQKPUB4
    Lh9tw6eAr2Por2gFKeNaoMpK56qA/iMA6zjs3wK1ChJOYQkp3AiYA+oB11z2
    O4KMFE6xzwXUApjL0A6xSwzUxAIWKrFd+DV8TtyIOtAJcgu5g/wBr+Rj+d18
    PlqnSoBUQFV1Cm+he8Qq3Ay8088SCp1bxFfgPegTvkIzF2C/TjkCnM9xJcBR
    FToI1yLRAjyNxyvJaqCUvo1AxzVT+BTYDxA0dwPXCOqgDDQfRkvQXrQPjSTt
    aB1AYvyKY4S/ws6t/HvA8zp8H/dXdJzkoERUxZ8HWSMoatpZWRADn0L0Y9SJ
    3kbvo7/icHwrbueCuHu5j0k+eY5c4l38L/jzQpCwSTgnjhUXi7vFbs1wTZFm
    lTZUO0F7QGfSlek2SRYpX+rSt+u/MswynDeOM64y/sY0wXSP6Zx5mLnY/BPz
    kxaTZYplq+WcdYK10RZnm2vbETA6MN8u2S/Yu4OSgBIOVSntfJWwA04hGhTq
    MPCXkXgZa4UWKIdTDp88dx2ynDx38lxqgDXaGh9tja7iUbeXhHV/qLRrTF99
    0QBVKob6dw/2CKcAxhiHhH+MloGOOZ63dE/ttJVN7Qwou3nWfsT1Hho7m8K7
    eC4VO4wOoVioEOqF9UKHIM7B1lgr9uwRTvWcArugpWGn8gW3RLQhI8A0iw+g
    zSajBhGbiAIkk+UdChRgShTm1E4zGyPH2Nln0s5ZMzMBSTcgETl7oC04diiX
    Mco2hluyavmKlR3tbZs2i7aPlBvOnlXGf/gpfuNP7+LD5wDfDsDnYfiiHGYN
    xafBSG/jA7QI8E242A83ID3IZg/kNLGjbRmjuB0Asq29Y+WKFaLtnDLh3T8p
    4z79EL9+9ix+lfGxrdeGX0MKnD9CHAayDa0QIdKGoCEigDr5tgpxTLqdxAZc
    OLFjWYnypHIIO2CfC7/LtXArQKbW59FWjseIt7zzNlNHakC0PdrFhfV8yK3Y
    QXH8AX7tBRyw9gW0gqPgQfgg6xQGO/YPJ04oCi23e7O5fUxPIx2BKBRzmAsl
    iGRz20FlHMIk5TBjEjQEBaTGInxGr9kxOB3Hcto9PV+Bgv5Wi5jdtPZ+wK8D
    T9XDqTLWESB22FCHYYNt7RBduDmShNvDhgAFF6m+z1w8ZzmfimM4q8WWnmaz
    WriENGS1oNgY+ptbs/Xhh+G/hx++jHXKl5cvK19inVCsHFfehus4oE7Ho3B6
    h+JVVimtihffh5vxnfg+yvd7cAq7CfgB1Tvs2aSD5zqEZRrUodNGieEERWG9
    5aTPOjC1jnOHVaGkXaQmDSwCa8+ZiZnn5oyJtgoZ8elWkKyCpygPYvdbeEr3
    jj28N78r/9KpPUyX4L38FOA5HG1zJISEhpEh4VaBR1ZB4LMtj1g3GTsCN/AQ
    xZFF4rAUHmwhYgR1Ajs4QVDZzVM7A5knEGq14FuHDlltmT56Bohc+Ax3hlus
    wZlAnSNtBl8ulGvu5O8UFoa1hmggxofwoXAACG9EC8WmUG9YY/hytCpkeejy
    sOXhu9HuMOscNCce2MgYjcbcgDNGDY2NETUZN+D0NN4eKGpEBInlle5CEGS6
    c9pPV912YvGdJ2d9jANzbw5RLu7Zs2cR3jCudnPBovbsSW9fl/bxq7fsrI9Q
    PmX8bwWde4H/YajekYzsAdIqXdQqOaDDbuzQbRTDO+SNsRvEtfbHEoPCAxAJ
    DAkfKlvCSWCUTkykYggq80tAxyQAIgC3CmYmd+7MxTPnLB+dt7APyAVihM4V
    6Yxyyq5oHs3BkdgeyEfHDE3IiARWRgNfI3CGOhjEIJm44THlV8rHtx6ZX/Zm
    7ctH9u/c+3zbtsceKH25wXt09kfY8BMSH3V4/R+/iI9/7bq09nU/btu1qN67
    JG7oc7L86313PUFt2wV63gF2xUE0WOaIwEZiRIQYsxHRazoETJbpsEFC4aKW
    N7BYpAfGjIwxA2Xs5ITD59KsVLNnTk44lwa8MNXyR0G9R6lSh+vRcJSPZqMa
    tAjdizRBeAQaikeQ0bgITzdMN5bjKtyE7yQrsRGUqcPRJN0KbgwxMjqDiAqH
    lQzl1KmjPbcK8d0fkOPd6buVDlzxmi/efMC7gPYIdKsjlg/VWFdZIkI7NIEd
    ltVGrgMtM67V7IgMDscSCUeSRYy0dOOBmrEMiKgW6jOgJMvh89SNqR+DgpTD
    qn5oELJSqSN7IBqkGKqPP5KQno6kWUmXcJxyUvn81teqbzp0+1NvvfXUjY+U
    Caf2KPebzcr5//mz8hdZPnZd6vNbtz4fN5TFlXVAfzuLK3FoliMuQETGVQbU
    ESR2hAfttHQYVsdsCF8bb4jRhYdEBoST6KiweAg0YEhnWKg5032m34QcgVBn
    4ePccXKcPyYcE4HzfZHcHDwHx4j2wCCVWmxPxrExHPGzEivTsBSdFsTtuGf7
    9nvgwrrChwrfPGEev+/297CgXHhf6VHO42IcVvgQGX/g0UdefPGRRw9wzV1x
    Q5UvlM9nzlE+//Qj5X9YoJqLd0YippfdYFPVoBcRVTqGCFaOcMTKQ9wQQCdE
    IBgCvKixdL99mOWZlKtCMFXSrJcgSdPkoEEa0JN1zNjZDtssDoskVMgU8oV5
    pBN1ihqwGVAOjsXRu8mhnvdPYKUnXThVfmmZQFMrRP81IOM1TMaxKAVNcsQP
    AQkniB2RIztsGyLXJjyWOsQQNzzcHhdu1kEkh3Bujg5LtXQfPnfx8DkmXL/P
    sqdMcNYBAo1PhqgTl54WRMMNc9vYmLiMUaMD/AvAPrg163fuXL9+105l5/IN
    qPe/31U2LLv/MeXLL79UvtyRv2HF8o0bl6/YwL2+pbV1y0OrWreUy/uWPvur
    Xz27dJ8c88a60x9/fHrdG9jZuHx5I1zMbpYBT63A0xBmN7GaqBC8CoV0SDv5
    DrQ6KKrDsiFobbwmPDw6IBLFxIQbmdkAA/4M9ZHyF7/VBB0OeTX0UNih8EMR
    r0YejtLssR20fWIjYDdjmI3bAkxgMShjFEpXbSVmKPYzBlJ4r3DrVLCWcfsW
    /Em5jC3vY4KtyjPKh4Vb8Q0+i4oCW8FGbCu/BZs//QgHseS2Xbk5ktvstyfK
    0wUwnNf4WFabhTtM4gp+F6R3CEA8GqK1dENsodnjoprkaYS4cOIETfV8rMJk
    wmoPtl+H4h0BUE1otvEr0C5JoxVwCACRGBBWhpzpplk6QAXEqpETtB4BUD2n
    1ZqEdlaRUM3iooRedWQhKxQlAs/R/IetEpGQlYM4KWkgKYp0Umclkpa+gMip
    aaNxU9Bp4ZxCO2I6QYLsfDiYGvuEMyfP+aMkS4B9N+1nfheg49kx+2QDxnMc
    2WZs5swas9aMZqGFqB6tRToN1nIi0fFBOIQrx7O4YsM8XM0txgu5u0gDv0iz
    WNuK7+GWGh7gHiTtfLAaWGllQ6JJLHdQOc/FK0s+5DJ/c0/PbfecEkw9IWTv
    pRG4RVnGfOYo+O854F2LrEgGn4kNQW2Srs22DLdJT0VZ9VouICRKQKbwICEk
    PFmHwm18NFhYGlR5LMexRH+OOkxm6j5zDHCBrdGq1fQN4qMHOk003ohzHnv4
    4ceUg3jEpg0bNil6jj97aeldbTuVC5d7PuaO9vyxdc3alVyVcoOn4Y76XYee
    Wf1ooHzsgTd/DyHC2/uBkAD+EIJGO0KNj5j2Sm1W/Ajay7cFb7CuDdWEGFFq
    oCWUkuhzAUrbX8+nPmcOiwrjgDwaF32xcPQYu6nvIUhIqDq7vBcpF7AFo+Vn
    q+Z/9mPlKeVOvAqXrvpMmHvqtluVI8p/KaeVI7fediI/H2/HoAm8fTKzSZCj
    0OmTY7LDjtp0IEGLlrNISAgxpqFwHW9jlSPEGFVoYN/7KgKYwHz+Fh/N7okY
    b7yIM3CU8p5yTMkGPPtwu1KtFCtOIeXyIjwEJ+MkHLxL2awsVX6ktLM4TPW4
    BvDrKXaxjefa0DJtG/+UJGCdBnIib6AiOXn4cJ++UvdFGQE7y3e+6yjp7Anl
    jvRkcl9130DTWd6eng/UGpHKncbWCJTpkJEQhttIWJvW9oh1r73NtEG7NpJD
    4dZRfPqQEL0Fku+57jPdh/vkr5ykoTU1HvJ8tFXk/RLngwfqgn9NeZ6zNSkf
    dSiPKk14Db71fqzx1HevUc4rn+EAbLt99ym8YVdPS+kM/CCuxXX4wfy8391W
    ofxC+bXyG+UX8X45COOZHJIcgdo27ikeLZNEkIAwVof9YuhmEWbCGRik7itm
    UoAS2ZpOKxFr7NG3uP9+662emLfg2LaVc10aQSXig403snNG8gvoaY6CY4dB
    C60qEKvE2dkEjoGpgnoQXCdsh2MgQAeoAO8SZCrc265UMTh6lO0I0HNI0yZ0
    omUGQStm+kgcBPMMy0oQyKgMKWyjw1hsrDCuM243MtgW0VczHn3r+AfTJq6q
    A0QblS8u7ml/tU8m89l54nPHMK1VEAWNVRQFlqhZlMvWChwh6GmdKGBe1FIi
    9Kq5sHIPYmmwv9gbELh4Gri0hAau+wM5zHM6bRA3TBimHcONFkZpJ3N5wiTt
    DG4et5BbJKzg7hHWaTdxD2nPcnaIZ4JODCMhGgGiqGYIGSaMEIdrRvOjhdFi
    hibVkEUcfK7gEB0ah2EuqYAKY55mkVBvWEPWCD8R12nWGbaQh8WHNc+Tn2le
    J69rfkd+q/mYfMJ/LPyP+CX5SvibmDTnDjTnDhAOjqbxkGl1G+Z7wkio8tee
    dKrb1dyinvzuD7hf9lyH+nyIykmArGKgDsTjcDIO8fRMSzV75lyqQ5eqKdYs
    JUt5XjUacJq3uN913wYih9MUgyFGAQwD+rljFLFqtBrOijktvRFOJ+kgoUi6
    bEnDES0IXKuHzAFpQ5DEcP4GCeRupL5DIyuVO623g/sTCEsbWl/ltK/eRCVf
    Tmi60HGSnQvUBEhDuaEaWTNUkqVRmgyphruLW6JplpZyyzXLpfVcEI/1JACH
    kVicRBK0w3Sj8ARSrp2tc2vn6xZqmyFm3Ufa8EMkkNVaIDjav4il0sMj8d24
    BY98XWk5prQcFk51a8lXl0YIUd2IR5fe67MzqMggKzc7IjVWeg63wsksG5gF
    VgURa7hwfrQGuJRULjN91pU5wLqYVUXpKW+po7mxmnxusqaGq9Is5TQi1ol2
    HCrm4QJxJp4lunGN2CyuxPeKbXiLuF1vYVRDOLUyhWML135YudAzH6i9HMW/
    d2kE/97lKIjVNJadHnDGb7OhNvWMH2JOJyF2yxBG3oAzPg1R6ex0n6CGK/ab
    JLyj9GDyzjsYK73v4HF4sXKP8obyutKKm4VCpUv5UPlI6cL5OBSH4fwdys3K
    NloN4R1QP0MF7c8b/H0sbwSgcY4hkDNo6rBZJC3H08wx0UpTR6AatVSzYKd8
    h95sj7JPtN9mf9ousBzSl2vhuMiPAAHgjcp9W7bcp4zFb16mFF5W3hJSen55
    f+uq+3d98Ic/vt+zG3RG+x2PgiwS0I8cE4wGzqTnIqMitTpOI3FRUZHZkj4y
    irdjZH8kcNOQNivfhjbFQ6IdFinpo8I0KCYsxDRSExIYM8zyzmGQ2RmoNDPV
    eEUPvpB4LW/0mbDpMxj6bqBkMyS6Oc9HJaYkTk8kal5mhWbUNQ7FKdhfffP5
    3rdv2/nsol13vv875Y/K2fmfL11yruGpg61blrz/Fg7+S83vhR2vjxm9dGGl
    OypkxOnnT/8pNeVXuXn3/KjurqghIw898caZoTQGXwK5fwJy16ApUIGqzu6A
    POkQtJaTcNpick5LhfOJRM8nWnY+0SKt/3wSgHRRyAImFqWx6By6et12nW4O
    oXkUcojIf95z/ljPeUihl07R0wnuqzFF9IIjgacxmMBhSY3CBN5DlMAom/D4
    aUQLSSQIWOOvI8FBviYGFGupn8xFZDiZzE8WbiJ3kxVEIyINp+WprwRyoXyo
    MBxO4UO5RD5RiBdl7ViUjtO5CfwEYYyYj3JxLlfAFwiTxdmoXKziavga4U60
    EMrLZr5ZaBKXah9Am8VE8CwoKnVQV3JTet44gU/j3/+m5wj4VTD/CSQ1jHIQ
    0uyicQ8vcRQIoaIAsY4PlXQkVNJLXCjm9HpJpOFQgKzjC4cGWG1FyJAtQfoR
    IUbotQa9pNOqXy7rNchoOfl2sC9GpF07EPbd+0ppxOLiFyInCpwEOU+yScOE
    OIiIN3A3CKOkVKmQmyZkSw5pNjefu12YJ1VIS7gW7i6hRVgqtXNtQoQG6TiI
    zrwoQCqAqMWD3jU6pOMlyYBMocTO27UhBotJ5qMFWZQ1sjZWFyfF62WTbJrA
    jSMZfLqQqh2ty9RPNKSa8lAensKxfCZkQzDM1jq0Dl2ONM3gMDlMsziIv4Zi
    UxU3jzj5uUKFWKGp0Lp0LsmlXwR6WMItJov4RqFZbNYs0tZrFxtaDC2mVVwr
    uYdfLazU3atfZ9rMbzc9bbqZRj+qIqqlWB2OzXkbQlLmB/TXcWW1AnHpVQU0
    ZuPP0wtit+XSBRq3e7vBF86yGLTJMcxXFWBOoDfCAe9USdpsGsRFTsM7BPAS
    jY55ie2bzRNJVBUTBC6Qy+BSuVSQSh7n4ByCQ3sjd6Nwo9bN/ZjbyFmCcCiJ
    kobiRDIGjyUOCepqspjUS9sl2igijCPwK/403oYfOt1z4Rhk7y1cVfcXUKke
    UXP3LeBfUSz3rHeEsbyrpc2IbC14NmkTQJ04m0eiRPtaujLq1bQtJKotyzPW
    vpJ8cHfC4QAb0gzRJEJaVVNRvlYnEL0W6YNIqNaiT9FnkEztRP1kMkU7XT+D
    zNZWkRqtR7+ILNa26Lfrg3xNC9q4xNFevq27mBy5fD3p7J4nnNpy2bNnC7+B
    5YElEIdH8kvAXuPRQUdCSJQ+WGdCjweL+01WeVXUgfD9sV3WtcEGFEyGGHVa
    fRTRBuYOhbTw9knwDZX+w2cudkPCeoN1MqyZ9MxflxqRGpkalSqnRqfGTExw
    RDgiHVEO2RHtiCmOKI4sjiqWi6OLY4oT6hNWRrRGtka1yq3RK2PWJ3QkXEiI
    9G/1b/JvqIisiKqQK6LrI+uj6uX66KWRS6OWykujhwzsQV2Px1hjM2hLYWjG
    qNHp0QM7mkHcy+8+uczz4P6urokH73nyWM9lzP10c8XzZe6Xb/rfC1x61ZK5
    3tPPJRb2LNtT5Xzl0ZcO2VrWJCfvSUjoprI6ALLaIQZC/g5HYx0hZL/BrNs/
    xL7W3BW2OQTZbJOHGERtaF4ETZppF1lNfoZ2eN44n/p8ReTSyI5IAnT6+xpA
    KmZNMquFA1oTaKeAfPjT++//Kb16fjLumSVvo97et5c8M27/fi7l2Nmzx+Di
    SlxO5aDyFXwOOl27gRqM7uj9gJwFHYagiY4wtArfw5tWGe+R9lv5/cFd9HBq
    M6L8wFw4nJ7xH04tysXzlr+cp+k8zBK2NGx9WEeYgAckw3TfITXGd0glZ4se
    Ln72jTeeLX64aNrOOT3Kb6EyE2c8ymc8OWLEB8ePfzBixJ64OGDIhG14XCyz
    LaCLvwkotKjyCt2PTIH7Be1aUxfeTIJ5pOUmW2363Ah2Pk1L65PX4UHyoscj
    pk6OFUNBeEDfizza1TXumbuO9aLeY3c903MEJLd7N0iPPM/d+rdzu11OnIO1
    8MlxKnafAH10tYC8AlEYqnfEITvWrdLeI9gfx8J+A35xyH5bl2FteJid09q1
    aCpnM+eGMxIPs+8XqPjUpuhFtb+VODGiPqIj4lcRFyKEiWginshNtE8ME5I0
    KdoUXZLkQR7s4Tx2T5huzh1UxNGsuOhvAYAJaJjYNXxL9z7D8RfmH5lb+avb
    lYvKEZzY/T7WdHE779my38TdetPLR0aN2js8CY/FEpxMJyl/PLz5ub3baBxK
    AYF/BbIOQLMd4YIFG7SPi7gVbTaJByUuQIM0OkFrNOsLA+khT6KHPD095E3t
    NLExjUcTDndPOHzYxlyaHlEt59Ns9OT3vMNebO+w01IJiIzAarERm5FO3Yv7
    qrNyGk5Rfr2/s3PvS2Lgg8XVleu6U8iv1xW9+ASVtVLO3wSy1qNhUPHEhhgi
    dLZVAUH7zWT/0NiuhIO6/eaXQiOGhiCtYbJos8m5iawvqprD4TOqQSinqKQz
    wSqGLx3eMfwKLwq2cP012/XYZyo2MJXgjHTy6M62TTt3bmrb2aUol5xP3njj
    tpKfPZe5765fdHf/4q59mV3c9W++886bR95551PlfeWTiMhnk4a/9PObK+dC
    +qJd5HFzK/dQ+R6AXOVi8h0Fnq9DxITFVpO1y7BZgmMWKqKxMY+Vy8zxJ9DW
    rtUGtcO+CjvrtcRaVZJhkM76/EG8q+uuu9qe3L8/+9mmV97gdvTcwm3bvu3l
    HT2tYmDPNrfrc+pDrwDyZsBLe5YjoGJ8mX8GHeQErOVRXl/PEs7o4Mm0HizW
    VUBNKLAzImthvtIFP3zF5Q4x8BOA1/sHpZzB0yMzynGE6zkNMr1s0LQKL6GD
    hmcsWosgTjdirQHlWRj0M5m2/t40UwIgsjqsxdYKa71VRRTo7wOoCB/7Wd51
    NYUM69rfHtrqfFAc9gnLlf28xLyANnNYi/L6vld1GC2C/zvsC3BkYwwA8WLg
    38755K+JADuKQTc5hoo23RAzEiM0dkNrhEy6wg6GWDTIatZqxWKr1lwcPgTC
    cCw7u3TD6YVVCxMmnLnIDrZUKY6A1LjiuPq49XEd8Pl53LtxvXE60BLTi32g
    rvqVZleVlph7aPnTL+9vaFq3a3/Dovt27d8/sbP5zifI6rsW/uV9qsJHtlIV
    ctsefejnj/W08hV75829S60VmA0BDwFo9GAbOnhtGzrjt6HnKuy/tHNXWpH9
    71gRoKZGpMa7JuaDweCDAeJ+G9pv6KLnTpv5RmKz517x3bIjdmLIErREbNG0
    aFt0LVKLfomhxdhiajG3WFqsS2wdIRdCrIO/9Rn0FbR305NPtG188smNF7BN
    OX/hz8rn2ErePXv06NmP3zzyyVblTeWc8hkEt0yIYYF4LMsVByBO7AAaaa64
    wRHmzxVdprX4JXIwAvLEZJYxBmRXy5kz/nTh0Kn54k+RPJ4T3yccX2odlHK9
    +/f3Z1ZurD/f7u7ZK0p7BuRW/Kk/Yai5rC+OMfr8ub/LvDbspZCDESzzT4Ya
    YEA289P3xhX0DUxgeEBig2gFh+cUfw7jvP2ZbVxXV18F0LN3QFpz7fnbX/22
    RaYAfVaU6ggU4Qxj1ZNWU5fuoEYSoZTOs9GwymIF5LGTb9PE9VxxwPYAalVq
    zu83qWAyJaogaetPQVIHVgYkh5PnbNZjL/fsA4OqqhQEhs8DNccRwJeAzvrO
    76W+43tp//EdapHVfOAq++ohtBaJ7+o/v5eEaU0abWBM7jBK18lB53eI93+h
    xYlt8Pndf3xHCbS4rw2XwvXhhmRIsEn6JMN43XhpvH68QS8jGcdxw6Rh+uEB
    KYEp9uFBwyKHRSXKidFxCaukVfpVhlVGG+WA40RJ1BMDMRITMRMLCSGhJIyE
    8xG6hJTEiYm3JbYkLk1cn9iReCFxCFTTd1zZKBBjr24UjAbpkTVFu29avXru
    pomHd375Xze9tqDqDefyte4nHE888KdfVD3HT9w7bFhZmaMg2jT8wdVbn4+N
    fTkjY/aNU4vjzXFty7c96ft+cwwY3RfCNogVUDmZBK2ZPI6s+KC2VdKDlMET
    LDYTjRUsaaf5jhHqF+WQc55Wcw7N1IFB42neHppBM7YVL8JLlJVTvS+9dOrR
    1lZhm/Lqup6O1UVbtv+Gq1iHb1BtfS/Ei1ksTgWi8Y7w/ki1VsIHA7sMEKcC
    9UUQsfLs1NgzVbs6k9YXrjz2QzRcBUCmU229r4YbivfScPVUV9ekZ5peeRP/
    Eh/gdvU4t29/eQe35HLHk1WVF8huyv/1ECtb+AokosuOhCvPhiKcjuFsKNKz
    4c9pS4PDAo809K9TpL7+Nf0Knv6tCD1vIXbe+uamBnb8JB9O5vRMvopbym3g
    dnBaikhHdGDJdjgqhvJDET0sJvKyNgNl4HFkHA8nSzhnF5ACPk/IFx3aclSO
    Z5PZfLG2ClXhGlLDzxOqxQptE2rES8gSvkm4U1yJVuLVZDWco1eJ7agdb+a2
    kAf4B4TN4m7hp2Kn9pD2XW2v9gb/uRrHXv8avhXf+ppyyyW+oruMPHm5g9lI
    OYggA2RkwJ86CoQZau9jhqQjM2jvY8a36n38/Bq9DyrFqZ1W+hc2NvorgP7S
    q4KkksVTOw3qn2jQ7wv65PsPt0ywo1fggrggIUbKkAq4AiFPckg3czcLM6Ri
    qY6rE6qkZtBGs9AitHIPcg8Im6SD3EHhF9wR8kshQuB0ROT1gqTV6+BmsHMh
    JIgPFcK0YbpAvd0Qj+JxLJdAovl4IUaM0cRrE3RxUrQ+1pBJRvOjtZm0R8Ll
    kzzewWerPX9tji5HytHT/gjVYzlXzN8olIglmmJtqa5MmqGvRC7s5uYTNz9f
    mC/O19TpnPp5Bo+pCTXhZu5uspi/G/TbIt6padEs1jbrWnRLpIX6uw2t9FsI
    02a0GW/iNpKt/EPCA+IDmge1jpR2w3bTLrQL7+B2kCf4J4THxcc1T2h3GJ42
    /Yx7hrzEvyh06X5uOsy9Rt7m3xKamU2EYfofjtXj2PKujz48/dGHXcofTv/5
    i9NgHe1kPr0ud5D27vlgI+PBj5rBRvR4kiNPoG1x3kp4Db0JPOYwsXKgdius
    lKw6CdObXgKT0VnBYLIlDY95LfgY5xuBSxj8BmL26Z+ZCm1q+L2uv8Fx2Bp8
    xRc5V5rE1V74gMTzUihvl4ZK1/PXSTP4mZpZUpW0EN/JL9Q0Svfxy6UH+e38
    Zs390nppF36cf5rfqXlM6pDCJcIL4AP6UGIX7LpQfSIZKsTrhutl4zicScYI
    ozS0N5ZqLCB5Qq5uit5hnE29lZtNZgrl4mxNubZcN1tfbPQYF+MW40N4k+YJ
    vEPTafyl8V1jrzGFfsXN0QYX63XxLuV2vOe0ckA5cBo/qzScxok4ka/oebfn
    Fdyl5HNTuCDlDryOxTKoHWgsM+M1jkkaLaezIjMVM0Jmk9WMzEarwYjozWQE
    xzVYwW2zjXqdBemFVvKSSX/QYjIaJB14q9bMm/UWvwK0TOz6AWLXq38IxqRu
    gYB8zteP+TpvFD4LTqMyvyAiQSvqiDFICjZajLHGDGOBNF0qMt6ku0maL7Ua
    lxo3Gm0SAiLA0/QmvTkY2zkLbxGCpUB9oCHUFGpOQHGQeWVeFhK1w3TxUpw+
    zpBgHG4abpatYyBaZnCpfKowVhqtH20Ya8w0ZZpTrVnIgR2cgzh4h88Ds3W5
    0mRjganA7LCWoRvxjdwMUswXg35mgH5m6maCF84wzDbNNhdbq3AVVy3VmGrM
    FdYl2sWmxebV6F7dSv1Kw2rjatNq84O6Nn2bYYtpi3mHfofhCdMT5k7rL63v
    WnutbtClYMLqsWUiZr1LbmPRprs2LigsS49WxqsBt/rNO7fkryrji7o3kQUQ
    +3p7oQ5sor0W21CUhBAcOiahdTQW41iliYPzDeTMKIdJJ0rG/xVhbEkgukDL
    OyfZn6amnOyG03Vq9NXFQwJXNmb04oXJM0fETEkZP2HEyBtqUmffbDCssJpT
    kyNnQi5EITit79/qPYD8/9gLg/Yf8I05xKPHfGMC8z/1jXkY7/ONBWRAL/nG
    ItSKR31j+tcDv/eN9SgCfeobG20PwylNHZvQqICdvjGYZsBp39iK+IAzgBHz
    OiAoNeBj3xijIPsQ35hDWnuyb0xgfrRvzMO40DcW0BD7XN9Yi2Lsd/rGejTO
    vtU3NsaPs//WNzah6vEW39iCgsYv9o2tSDv+J5M89c0NNfOqG+VhlYlyWmpq
    ujy3Wc6uafQ2NridtUlyQV1lspy1YIFcQld55RK3192w0O1Klq7aOppuLXMu
    rJ3vqZsnZzurv2Zjjnu+s7xJrqx21s1ze2Vng1uuqZPrm+YuqKmUXZ5aZ02d
    f02ps86b7fHcPuBxwLDc3eCt8dTJacnpY1KrxrrHVo5Q3w5YV+WpA+SNwEt1
    Y2P9uJQUF8wvbEr2epoaKt1VnoZ57uQ6d2MeW0ZJocz08S8P87rd8lz3As+i
    xGT5WxCeLE9e0Fxf7ZVraus9DY1ul1zV4KmVsxrcC32k+HEwQTWpghqIRpL6
    sQODTlklrU/a0shv/JGu1su3Vql8BeYar+SUGxucLnets+F22VN1JRRJKnY3
    1NZ4mRZqvHK1u8ENuOY1OOuA9STgHdiCbSAxkHOS3OiRnXXNcj3oDTZ45jaC
    xGpABE65EoiWYGVjtdsvp8pKT209LKcLGqsBOkjZXecF6cUwkcQkAjCX7PR6
    PZU1TsAnuTyVTbXuukZnI6WnqmYBKGkYhcg2yKWeqsZFIP6YREZJg7u+weNq
    qnQzMK4aYKxmblOjm9IgDdqQBGquXNDkopQsqmms9jQ1AjG1NT5EFEODKkoA
    2+SF9ZSdJLnWTbmWmIF4q5MG4EiiOFM8DbLXDXqA1TVAqo/9K1BT4gBsPRV0
    o6SKjiFaVA2GddUGqoaqpoY6QOhmG10e2etJkr1Nc+e7KxvpDOWvyrMAjI0y
    VOmpc9VQPrzjJKkMwDnneha6GQeqFTEC+oygztMIavCqs1Qr9f0WoL6TvdXO
    BQukuW6f1IAM8BLnID49dWAXDXKtp8F9TbblxuZ6d5UTECWrRA1+W+tsBm+B
    7a6aqhpqaM4FjWB6MACgTpeLca6KjjqoswHoalrgbJAoIpfbWzOvjpExT/VV
    2EQt1FkJQLx0h58e75WYKEgJEDCBORdcG4Bvj5+OfmhAXt2CZrlmgJlLlJ0G
    N/2H7WwtHXipIKle/O7hBptzN7BNizwNLq8c0+eHMRS3/4UUQ902hokMNFPo
    85e5bvAkCrUJdEBlstBT00eYe3EjeIzsrK8H93LOXeCmL1TeATIdSP1KqXY2
    ytVOL0B01w2SCbW6fut2yU11Lh/B/aRKjDiVw2/SqtezgHo1UxtVklNeQKMH
    +Ip/Yb2z8nbnPGAM/LDOI1FT/ceMahAqCFhAontBFSUqP1fOm15UJpdOzyub
    mVWSKxeUysUl08sLcnJz5JisUniOSZJnFpTlT59RJsOKkqyistny9Dw5q2i2
    PLWgKCdJzp1VXJJbWipNL5ELphUXFuTCXEHRpMIZOQVFk+Vs2Fc0vUwuLJhW
    UAZAy6azrT5QBbmlFNi03JJJ+fCYlV1QWFA2O0nKKygrAphAXImcJRdnlZQV
    TJpRmFUiF88oKZ5emgswcgBsUUFRXglgyZ2WC0wAoEnTi2eXFEzOL0uCTWUw
    mSSVlWTl5E7LKpmaJAOw6cByicyWJAOVAEPOLaebS/OzCgvl7IKy0rKS3Kxp
    dC2VzuSi6dNypbzpM4pyssoKphfJ2bnASlZ2Ya5KG7AyqTCrYFqSnJM1LWsy
    ZcePhC5T2ekXh0Q3TM4tyi3JKkySS4tzJxXQAcixoCR3UhlbCbIHSRQycidN
    LyrNvXEGTMA6P4okaWZ+LkMBDGTBf5MYZYz9ImCXwimbXlLWR8rMgtLcJDmr
    pKCUaiSvZDqQS/U5PY9ZwAyQJ1VekY9eqiM6d7V1wCq628dgTm5WIQAspWTA
    hDRoLVhX7uJKd30jtW2fc6uhkYVRNXYmMatVgwCY8OQ6cFx1jg0hLYFnsayj
    Rrf+hE3TcZIaeln4AOuGTKSGXtdCN0RALw0lngbJQ4PJohov83RIgbUeNefJ
    XucCQAa7qBexVRArnQtgm7ePzEEOJfmTYX1DDWxZ1FDTCMFEdjbBbEPNnb40
    3OBLU4wDuZ8DiqU/OKj0N7i99ZClaha6FzQnw9oGmssYJTV1UKvV+lhn4qts
    HOcvFRrleQy4y9MoQUWXLEsSq7i+d+n0bUvaH6YOktQ6SP4udZDUXwfJ37EO
    kq6ug3xBvpJB8vpzxjUK1P6CRfo+tZLsr5Wk/4xaSVL18E+rlSTVYb9XrST9
    gLWS1F8ryd+xVpIG1QXfoVaSvq5Wkr99rSQNqJUGuu+gcgnyOQSJH6pcknzl
    kvy9yiVpELns3PhDl0xSnUf+3iWT9IOWTJKvZJK/e8kkXVkyyd+lZJKuWTLJ
    /0jJJJVllU+bMp2SnZX/naojqZ/z71MdSf7qSP4+1ZE0sDqSv1N1JF2zOpK/
    T3VEjXWQo/QVPtLXFj7yP1D4SN9c+MjfovCRWOEzuHb4+wVNo3+9gxUNUjLc
    kr+xc5WyqOb2mpQaiCCLk+ur61N8YeyKBhqahDyoHjWjBlSD5qFq1IhkNAxV
    okS4p6FU+KTDaC6skFE2rGlEXrgakBs5US1KgtkCVAfrk2GUhRbAR0YlfbC8
    7MkNdzfsWQi/XbBS+hZYR/dhLQNMCwEX/b9c1MFqSocT9vxjGHNgNB/2laMm
    WFEJa50MmpvtcDKOZIBSB7/rYc1cgFsD62TY7wHsTvbuSjilDIoXKPLA5/av
    eXvt2XJGoRfgehjWNKAzHY25YnUVe6vy1eiTOuWzEagch1Lg4/KtXwjrk2Gd
    B+4NQLmb7W1gPCYDDDfsyRsAzc+zX+5Xa5e+o3J0M124QSIetAjWUsn/MPKk
    kCbDm2ZYU8121sC7ekZ3I9MdlUAD20G1TaEuvEIqV/LRby9Ng+zl67ihf2t+
    Ld5V/ThhNFBqV1uuhEZ+j4/0rbzhh/fBa+u7n+caeCOxUSOboVZWy2R9O8x5
    QAN/jxbKWTGDV8ug9Vt6DaOpmr1z+/iax7DU+bSe5NO7qi0Vm2pjqj0nMbo8
    TPt1bH+9z5tUDB6A2uizsRqfFTgZDFXSkg9mI6PiSnuqZOuoHarQ/RDoapV2
    1ZbdzI9V24sZYCUxTHN0r4vdvYyuStjj9PEnMS+oBAutZVAa2Ru/fKpgtMDn
    ScP6aOzHQGMIpb8R7Fe1foqxXyZ0pp55jQswVLLdfmpcjINGZmtz4W0je6vi
    kL4BQ5LPmyuBsiYGRZXJImYD1SzqNPokU8vmBnLk56FhkFWq1DYxGSYN0A4d
    1zJ9qrqWBkQQL+xO+ho+kvr4TGERRGaQVX9QYdf4pDpY+9/MtV9yKrX1fRbd
    yOjqt7p+jhYxedR+Kwx+b6hiUbvOx6F7AEYX+01xJLE7lcR8WFHJ4Klr/Pqj
    drzAF9n8GqpkuF2M4hofpeOYd5b5qHMCRA+LDP06GBiL+iVwdSSog/WNPm/w
    Dlrr95V+iQ2MAQP3yYxnJ6NcYrF5sK2p0lBzifMb9OlhWU726b6W3fvjx7fR
    RSPLRDRzOn0cJQ+S1DftpTJp9uUWFTuVeRWj0eWzpAXMThv6ZlRKqUxdA3Q+
    0Or8GdTJMmINixkL2JPUx5GLUUr1VTdAGvMG5VUVkz+GOpn1qLbrx3GlfLx/
    lyc/lZKPg34LczIdfXsKBuO5Uh7Xoi3Jp+8FbF/N10RzqU87DSzOOllc6Yfr
    n/H2WaTfX67MHm5fnHMzLvyYFjGuXGx/zDXyYUwf31fukOCdP9vGDLAy1WcK
    r8gvc5m/ewbQ2uTzA7+dLIS3NdeQmBstZnKu83lyPXzU7OVkEdXdt2Og3lWa
    /TPSNT2lmkV4md29PhrdzJK+zk78se5asdvFMkEd0/tAeV1LqtIAyQ3U4Xf1
    VS+Lmv5c3e9tfk+ilcOCvtqjwbdjMMR6ZtG3w+95Po2p+ZBaldQXVf+Zkerr
    uZrr85FGXz6s6pNUPspleKajIniieKbDUxmaCXVkCXtXAHMy1HEl8KYcnnJg
    NofpJYu9oe9jmDfOhDGFOB3NYLBUGCXwm8KeDTMUtsye6dNUWF8EsOjeXDSL
    4cgFaKVA2XQYU9jTYLYQ7rm+dXTHJJiZAc90PBnRKlTFVwS7ypjv0H2UFpXS
    MpjvxzqYqgKG0U/ZNHgqAfj5vrdZALuAwaP0J7H6iI6LfHSqkith0KmMKGQK
    cxJQVMie6OwMuBfDulImzyzGs0ptEeMhD96rvOQyClRNqBRNgnsx4KYrJgNd
    ZUwKFFOZb2US0yPlJ4ftp1inslUqZdN9WqbjfijJPlmqdFD5l/dhLmX8F8JH
    ZvyXwUwZ000WwPfD9dvOZAaB0i0xacxg/GUxOUxnGLLZOipFKs/CPosrGaCV
    SUxeVG+U8hyGKYtJpPSanPihDdTOtaxD6sMwmfGXyyRVyFaXghxzYX1B34xq
    jwWM10k+WaswVbtXbaJwgHQnMR6pZm8ErLk+m8pishvMBdXTTEZ/PxeqBrJ8
    vycNkFm/9ot82vXTU8Ywl11DKjOZL+ayVVlM16V9PpLH/Heaj/IZfRbWHwNm
    +Oxzeh9lg+Xr9yP/um8TO1RYftyDNZjD7KnQR2FpnzTUFdI3wFVjVy7ktUp2
    zmnsi9uDM/fAqrG/Gh1YdyYNiLUDKwE1Ck9ma2uvWNc/q56W1JzVf9YZWLtd
    64TtPx2rtby/6u2vPtTYrZ6JBla9LlafqzWgt68q8bA60NNXmSxib/tzer2v
    d+IZdM6jmJ0s9yf14fLnon5Yal3pZNUCxea9hjS/PkNJV50M61m+V7EsYuNG
    X2VC+WvyraXzd15xGvb3f67WgXxNHfh5uVblMFD+DUzf9b6zVA2TMK0nk31w
    G5D/XNYvEyoBta9We4XW+62PQhuHruwqUBnMG0C5i8laQmqPjuKUWLzy97j+
    /V2nH7oH+5/UD5IG9YOurLz+ef0g6Zr9IPlf3A+SvlU/aHAlXzmApv5eh3/l
    t+ugXqvDIv3b+kryVX0l6f/3lQb0lfo7DP83+0rSoAz77+srSdc4rf0n9JWk
    a/aV+jn61/SVpG/oF/xr+koS+kf7Sv3fOv2QfaV+fxvcV/q67Pv13SX1fK5W
    Ev9p3SUJDe4uXbu78a/pLknfIF15gAT/s7tMErOxq6uZf32XSfoP7jJJV3SZ
    +s+6/8ouk/R3u0zyv6zLJP0DXSb5n9ZlkpgMygHqFEatKu0seP+v6x1J19T5
    v6t3JF3VO5L/bb0j6Wt7R/09oH9+70j6B3pH3wT3n9s78kfWr88oV3d8pO/Q
    8RnYpfkhOz7S9+r4XH1m+24dH2lAx+eb+g4/RIem8Sr4DtTfaZAYHvqU/D3+
    5iqFyeV2uFIYbS5WNSWz+rUe5gZXY9/892Wc+g+Ye3+EbkLX+slh/3ZZQnpk
    QGZkQVZkY/8XEjsKQsFoCApBoSgMhaMIFIniUDwaihLQMDQcjQD5jASaUlAq
    ug6loXQ0Go1BmcDtBHQ987c8FtMLIEZPBYqnsYxxI/gU/W5gBlA7E3LrbKDq
    ZnQLUPrfvn9RrUVcby8i/w+kirO+CmVuZHN0cmVhbQplbmRvYmoKMTkgMCBv
    YmoKPDwgL1R5cGUgL0ZvbnREZXNjcmlwdG9yCi9Gb250TmFtZSAvMGY4ZThj
    K0RlamFWdVNhbnMKL0ZvbnRGaWxlMiAxOCAwIFIKL0ZvbnRCQm94IFstMTAy
    MCAtNDYyIDE3OTMgMTIzMl0KL0ZsYWdzIDQKL1N0ZW1WIDAKL0l0YWxpY0Fu
    Z2xlIDAKL0FzY2VudCA3NTkKL0Rlc2NlbnQgLTI0MAovQ2FwSGVpZ2h0IDc1
    OQovWEhlaWdodCAwCj4+CmVuZG9iagoyMCAwIG9iago8PCAvTGVuZ3RoIDEy
    NzgKL0ZpbHRlciBbL0ZsYXRlRGVjb2RlXQo+PgpzdHJlYW0KeJxl18tu20YY
    huG9rkLLdBFIcyYBw0CRbrzoAXV7AXN0BNSSICsL3335vROkaWvAxi+JnHm+
    X8Mhffj09NPT+XTfH367Xepzv+/H6dxu/e3y5Vb7vvSX03ln7L6d6v3rK/7W
    13zdHbaTn9/f7v316Twu+4eH3eH37cO3++19/+HHdin9h93h11vrt9P5Zf/h
    z0/P2+vnL9frX/21n+/74+7xcd/62Ab6OV9/ya99f+C0j09t+/x0f/+4nfPP
    EX+8X/ve8tpMTL20/nbNtd/y+aXvHo7Hx4cxHnf93P7zkTke5yll1M/5Ng89
    bj+PW2kojUpLaVU6SqfSU3qVgTKojJRRZaJMKhfKReVKuarMlFlloSwqK2VV
    2Sibyk7ZVQ7KLdGDwWvkNXiNvAavkdfgNfIavEZeg9fIa/AaeQ1eI6/Ba+Q1
    eI28Bq+R1+A18hq8Rl6D18hr8Bp5DV4jr8Vr5bV4rbwWr5XX4rXyWrxWXovX
    ymvxWnktXiuvxWvltXitvBavldfitfJavFZei9fKa/FaeS1eK6/D6+R1eJ28
    Dq+T1+F18jq8Tl6H18nr8Dp5HV4nr8Pr5HV4nbwOr5PX4XXyOrxOXofXyevw
    OnkdXievx+vl9Xi9vB6vl9fj9fJ6vF5ej9fL6/F6eT1eL6/H6+X1eL28Hq+X
    1+P18nq8Xl6P18vr8Xp5PV4vb8Ab5A14g7wBb5A34A3yBrxB3oA3yBvwBnkD
    3iBvwBvkDXiDvAFvkDfgDfIGvEHegDfIG/AGeQPeIG/EG+WNeKO8EW+UN+Ld
    /mq3+bqr/G+XiSSJShJJEpUkkiQqSSRJVJJIkqgkkSRRSSJJopJEkkQliSSJ
    ShJJEpUkkiQqSSRJVJJEkqQkiSRJSRJJkpIkkiR1PuFN8ia8Sd6EN8mb8CZ5
    E94kb8Kb5E14k7wJb5I34U3yJrxJ3oQ3yZvwJnkXvFWGBW+VYcFbNfGCt2q2
    BW9ToAVvE3LB2zTbgrdzAN6uPix4u8IveDuz4e3qw4K3MzHezsR4OxPj7Qq/
    4u1KvOLtSrzi7Yq54u3irHi7Eq94uxKveIeQK94hw4p3CLniHUKueIdirniH
    kCvegQHvEHLFO+DgHTLkzWvnzpzxFkq8WbNlvFmGjDcrfA6cxgF4iwwZb1OK
    jDcrW8abZcib15p5Gt6iFBlvVvvy5rWWCy3jrYyLt+mAIq/l/lKmV40qltM0
    WHGU6kOZXkr6WyijDuCuXhKDMcLCu6IXeV2VochruX0UvFlNLXgLZSOQkGWu
    B8rZX3kr66Fo3Io3a7Y6+6svoOLl5lrlNatkVf21bLx1ejVupb9b577bZUL4
    9yZTaXwRebso9CVxJgslK1MlCPEqQaq+28pCaWpQVRDDNlwHpQ5oLBSeKLYr
    TKW63SylgjRHqTXePKX0jYXCY0SbC1vLp6nxoSp0mwtbDWpqvGEPaWr8vEm1
    2XjKqne5Z7ZGyQibdxSe2Lalp1L0Phe23u1zoWjiPr06rU+vVlLHy+2+s1Aq
    I+AF2Wl8ZTC8Vf3tLOwqb6e/VeH77C/jzv4qW6e/VY3qLJSmTva5sJVtgGya
    eLA6miYeXH1Ns425uyn8ENLwTDKEtFwlQ0jLRjfm1aeJx8q7Qo5MyQiFkinm
    auaAxrtKMTolEw+mSN+vOj1T66n/27N6/XK7bY/p/GvA87mezE/n/u2/h+vl
    qrP0+zex2fAcCmVuZHN0cmVhbQplbmRvYmoKMjEgMCBvYmoKWzMxNyA2MDAg
    NjAwIDYwMCA2MDAgNjAwIDYwMCAyNzQgMzkwIDM5MCA2MDAgNjAwIDMxNyAz
    NjAgMzE3IDMzNiA2MzYgNjM2IDYzNiA2MzYgNjM2IDYzNiA2MzYgNjM2IDYz
    NiA2MzYgMzM2IDMzNiA2MDAgNjAwIDYwMCA2MDAgNjAwIDY4NCA2ODYgNjk4
    IDc3MCA2MzEgNjAwIDc3NCA3NTEgMjk0IDI5NCA2NTUgNTU3IDg2MiA3NDgg
    Nzg3IDYwMyA2MDAgNjAwIDYzNCA2MTAgNjAwIDY4NCA5ODggNjAwIDYxMCA2
    ODUgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjEyIDYzNCA1NDkgNjM0IDYx
    NSAzNTIgNjM0IDYzMyAyNzcgMjc3IDYwMCAyNzcgOTc0IDYzMyA2MTEgNjM0
    IDYzNCA0MTEgNTIwIDM5MiA2MzMgNTkxIDgxNyA1OTEgNTkxIDYwMCA2MDAg
    NjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2
    MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA1NDkgNjAwIDYwMCA2MDAgNjAwIDYw
    MCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAw
    IDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAg
    NjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2
    MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYw
    MCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAw
    IDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAg
    NjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2
    MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYw
    MCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAw
    IDYwMCA2MDAgNjAwIDYwMCA2MDAgNjAwIDYwMCA2MDBdCmVuZG9iagp4cmVm
    CjAgMjIKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4g
    CjAwMDAwMDAxMDkgMDAwMDAgbiAKMDAwMDAwMDE1OCAwMDAwMCBuIAowMDAw
    MDAwMjE1IDAwMDAwIG4gCjAwMDAwMTQ0MTMgMDAwMDAgbiAKMDAwMDAxNDc0
    MSAwMDAwMCBuIAowMDAwMDE0OTExIDAwMDAwIG4gCjAwMDAwMTUwNzYgMDAw
    MDAgbiAKMDAwMDAxNTI3MiAwMDAwMCBuIAowMDAwMDE1NDYwIDAwMDAwIG4g
    CjAwMDAwMTU2NDYgMDAwMDAgbiAKMDAwMDAxNTg0OCAwMDAwMCBuIAowMDAw
    MDE2MDUwIDAwMDAwIG4gCjAwMDAwMTYyMzYgMDAwMDAgbiAKMDAwMDAyNDgy
    MyAwMDAwMCBuIAowMDAwMDI1MDM3IDAwMDAwIG4gCjAwMDAwMjYzOTEgMDAw
    MDAgbiAKMDAwMDAyNzMwNSAwMDAwMCBuIAowMDAwMDQyMjA0IDAwMDAwIG4g
    CjAwMDAwNDI0MTMgMDAwMDAgbiAKMDAwMDA0Mzc2NyAwMDAwMCBuIAp0cmFp
    bGVyCjw8IC9TaXplIDIyCi9Sb290IDIgMCBSCi9JbmZvIDEgMCBSCj4+CnN0
    YXJ0eHJlZgo0NDY4MQolJUVPRgo=`;
};
