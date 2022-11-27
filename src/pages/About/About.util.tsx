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
  },
];

const getSampleBase64 = () => {
  return `JVBERi0xLjMKJf////8KMSAwIG9iago8PCAvQ3JlYXRvciA8ZmVmZjAwNTAw
    MDcyMDA2MTAwNzcwMDZlPgovUHJvZHVjZXIgPGZlZmYwMDUwMDA3MjAwNjEw
    MDc3MDA2ZT4KPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL0NhdGFsb2cK
    L1BhZ2VzIDMgMCBSCj4+CmVuZG9iagozIDAgb2JqCjw8IC9UeXBlIC9QYWdl
    cwovQ291bnQgMQovS2lkcyBbNSAwIFJdCj4+CmVuZG9iago0IDAgb2JqCjw8
    IC9MZW5ndGggMjU2NAo+PgpzdHJlYW0KcQoKQlQKMzYuMCA3MzcuMzg0IFRk
    Ci9GMi4wIDEyIFRmCls8NTA3NTYyPiAxMCA8NmM2OTYzNjE3NDY5NmY2ZTcz
    Pl0gVEoKRVQKCjEgdwovRGV2aWNlUkdCIENTCjAuMCAwLjAgMC4wIFNDTgox
    IHcKMC4wIDAuMCAwLjAgU0NOCgpCVAo1MS4wIDcwNy4zNSBUZAovRjEuMCAx
    MCBUZgpbPDMxMmU+XSBUSgpFVAoKMSB3CjAuMCAwLjAgMC4wIFNDTgoKQlQK
    NjkuMzM5MjggNzA3LjM1IFRkCi9GMS4wIDEwIFRmCls8NGM2OTZlMjA0ODQx
    MmMyMDQzNjg2NTZlMjA0NDVhMmMyMDU0PiAxMjAgPDYxNmUyMDQzNTc1ND4g
    MTIwIDwyZTBkPl0gVEoKRVQKCgpCVAo2OS4zMzkyOCA2OTIuMjkgVGQKL0Yx
    LjAgMTAgVGYKWzw0ZTY1NzU3MjZmMmQ0MjY1NjhlNzY1NzQyNzczMjA2NDY5
    NzM2NTYxNzM2NTIwNzA3MjY1NzM2NTZlNzQ2OTZlNjcyMDYxNzMyMDY5NzM2
    ZjZjNjE3NDY1NjQyMDY5NmU3NDcyPiAxMCA8NjE2MzcyPiAxMCA8NjE2ZTY5
    NjE2YzIwNjg+IDMwIDw3OTcwNjU3Mj4gLTQwIDw3NDY1NmU3MzY5NmY2ZTJl
    MGQ+XSBUSgpFVAoKCkJUCjY5LjMzOTI4IDY3Ny4yMyBUZAovRjMuMCAxMCBU
    ZgpbPDQxNmU2ZTIwNDE2MzYxNjQyMDRkNjU2NDIwNTM2OTZlNjc2MTcwPl0g
    VEoKRVQKCgpCVAoxNjguODM5MjggNjc3LjIzIFRkCi9GMS4wIDEwIFRmCls8
    MmUyMDMyMzAzMjMxM2IyMDM1MzAyODMxMjkzYTM4MzgyZDM4MzkyZTBkPl0g
    VEoKRVQKCi9EZXZpY2VSR0IgY3MKMC4yIDAuNCAwLjggc2NuCjAuMiAwLjQg
    MC44IFNDTgoKQlQKNjkuMzM5MjggNjYyLjE3IFRkCi9GMS4wIDEwIFRmCls8
    NjQ2ZjY5M2EyMDMxMzAyZTM0MzczMTMwMzIyZjYxNmU2ZTYxNmM3MzJkNjE2
    MzYxNjQ2ZDY1NjQ3MzY3MmUzMjMwMzIzMDMxMzgzOT5dIFRKCkVUCgowLjAg
    MC4wIDAuMCBTQ04KMC4wIDAuMCAwLjAgc2NuCjEgdwowLjAgMC4wIDAuMCBT
    Q04KMSB3CjAuMCAwLjAgMC4wIFNDTgoKQlQKNTEuMCA2MzAuNjEgVGQKL0Yx
    LjAgMTAgVGYKWzwzMjJlPl0gVEoKRVQKCjEgdwowLjAgMC4wIDAuMCBTQ04K
    CkJUCjY5LjMzOTI4IDYzMC42MSBUZAovRjEuMCAxMCBUZgpbPDQzNjg2ZjZl
    NjcyMDRhNDM+IDMwIDwyYzIwNTQ+IDEyMCA8NjE2ZTIwNDM0ODRlMmMyMDQz
    Njg2NTZlMjA0NDVhMmUwZD5dIFRKCkVUCgoKQlQKNjkuMzM5MjggNjE1LjU1
    IFRkCi9GMS4wIDEwIFRmCls8NTQ+IDEyMCA8NjU2YzY1NmY3MDY4NzQ2ODYx
    NmM2ZDZmNmM2ZjY3NzkyMDYxNmU2NDIwNjk3NDczMjA2NT4gMzAgPDc2PiAy
    NSA8NmY2Yzc2Njk2ZTY3MjA3MjZmNmM2NTIwNjk2ZTIwNjEyMDQzNGY+IDUw
    IDw1NjQ5NDQyZDMxMzkyMDcwNjE2ZTY0NjU2ZDY5NjMzYTIwNDEyMDczNjM2
    ZjcwNjk2ZTY3MjA3MjY1PiAzMCA8NzY2OTY1PiAyMCA8Nzc+IDYwIDwyZTBk
    Pl0gVEoKRVQKCgpCVAo2OS4zMzkyOCA2MDAuNDkgVGQKL0YzLjAgMTAgVGYK
    Wzw0MTZlNmUyMDQxNjM2MTY0MjA0ZDY1NjQyMDUzNjk2ZTY3NjE3MD5dIFRK
    CkVUCgoKQlQKMTY4LjgzOTI4IDYwMC40OSBUZAovRjEuMCAxMCBUZgpbPDJl
    MjAzMjMwMzIzMTNiMjAzNTMwMjgzMTI5M2EzNjMxMmQzNzM2MmUwZD5dIFRK
    CkVUCgowLjIgMC40IDAuOCBzY24KMC4yIDAuNCAwLjggU0NOCgpCVAo2OS4z
    MzkyOCA1ODUuNDMgVGQKL0YxLjAgMTAgVGYKWzw2NDZmNjkzYTIwMzEzMDJl
    MzQzNzMxMzAzMjJmNjE2ZTZlNjE2YzczMmQ2MTYzNjE2NDZkNjU2NDczNjcy
    ZTMyMzAzMjMwMzQzNTM5Pl0gVEoKRVQKCjAuMCAwLjAgMC4wIFNDTgowLjAg
    MC4wIDAuMCBzY24KMSB3CjAuMCAwLjAgMC4wIFNDTgoxIHcKMC4wIDAuMCAw
    LjAgU0NOCgpCVAo1MS4wIDU1My44NyBUZAovRjEuMCAxMCBUZgpbPDMzMmU+
    XSBUSgpFVAoKMSB3CjAuMCAwLjAgMC4wIFNDTgoKQlQKNjkuMzM5MjggNTUz
    Ljg3IFRkCi9GMS4wIDEwIFRmCls8NDM2ODY1NmUyMDQ0NWEyYzIwNDE3MTc1
    Njk2ZTZmMjA0ZDQzNDQ+IDcwIDwyYzIwNDM2ODZlNjcyMDU3NGE+IDMwIDwy
    YzIwNGI+IDQwIDw2ZjY4MjA1NjU0NDM+IDMwIDwyZTBkPl0gVEoKRVQKCgpC
    VAo2OS4zMzkyOCA1MzguODEgVGQKL0YxLjAgMTAgVGYKWzw0NDYxNzI+IDEw
    IDw2MTc0NzU2ZD4gMTAgPDc1NmQ2MTYyMmQ2OTZlNjQ3NTYzNjU2NDIwNzQ3
    Mj4gMTAgPDYxNmU3MzY5NjU2ZTc0MjA2ZD4gMTUgPDc5PiAyMCA8NmY3MDY5
    NjMyMDczNjg2OTY2NzQyMDYxNmU2NDIwNjk3NDczMjA3MDcyNmY3MDZmNzM2
    NTY0MjA2ZDY1NjM2ODYxNmU2OTczNmQ3Mz4gMTUgPDJlMGQ+XSBUSgpFVAoK
    CkJUCjY5LjMzOTI4IDUyMy43NSBUZAovRjMuMCAxMCBUZgpbPDQzNmM2OTZl
    MjA0NTc4NzAyMDRmNzA2ODc0Njg2MTZjNmQ2ZjZjPl0gVEoKRVQKCgpCVAox
    NjAuNDc5MjggNTIzLjc1IFRkCi9GMS4wIDEwIFRmCls8MmUyMDMyMzAzMjMx
    M2IyMDM0MzkyODMxMjkzYTM4MzEyZDM4MzMyZTBkPl0gVEoKRVQKCjAuMiAw
    LjQgMC44IHNjbgowLjIgMC40IDAuOCBTQ04KCkJUCjY5LjMzOTI4IDUwOC42
    OSBUZAovRjEuMCAxMCBUZgpbPDY0NmY2OTNhMjAzMTMwMmUzMTMxMzEzMTJm
    NjM2NTZmPiA0MCA8MmUzMTMzMzgzNzM0Pl0gVEoKRVQKCjAuMCAwLjAgMC4w
    IFNDTgowLjAgMC4wIDAuMCBzY24KUQoKZW5kc3RyZWFtCmVuZG9iago1IDAg
    b2JqCjw8IC9UeXBlIC9QYWdlCi9QYXJlbnQgMyAwIFIKL01lZGlhQm94IFsw
    IDAgNjEyIDc5Ml0KL0Nyb3BCb3ggWzAgMCA2MTIgNzkyXQovQmxlZWRCb3gg
    WzAgMCA2MTIgNzkyXQovVHJpbUJveCBbMCAwIDYxMiA3OTJdCi9BcnRCb3gg
    WzAgMCA2MTIgNzkyXQovQ29udGVudHMgNCAwIFIKL1Jlc291cmNlcyA8PCAv
    UHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0K
    L0ZvbnQgPDwgL0YyLjAgNiAwIFIKL0YxLjAgNyAwIFIKL0YzLjAgOCAwIFIK
    Pj4KPj4KL0Fubm90cyBbOSAwIFIgMTAgMCBSIDExIDAgUl0KPj4KZW5kb2Jq
    CjYgMCBvYmoKPDwgL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNl
    Rm9udCAvSGVsdmV0aWNhLUJvbGQKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2Rp
    bmcKPj4KZW5kb2JqCjcgMCBvYmoKPDwgL1R5cGUgL0ZvbnQKL1N1YnR5cGUg
    L1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCi9FbmNvZGluZyAvV2luQW5z
    aUVuY29kaW5nCj4+CmVuZG9iago4IDAgb2JqCjw8IC9UeXBlIC9Gb250Ci9T
    dWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYS1PYmxpcXVlCi9F
    bmNvZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iago5IDAgb2JqCjw8
    IC9Cb3JkZXIgWzAgMCAwXQovQSA8PCAvVHlwZSAvQWN0aW9uCi9TIC9VUkkK
    L1VSSSAoaHR0cHM6Ly9kb2kub3JnL2RvaTogMTAuNDcxMDIvYW5uYWxzLWFj
    YWRtZWRzZy4yMDIwMTg5KQo+PgovU3VidHlwZSAvTGluawovUmVjdCBbNjku
    MzM5MjggNjYwLjEgMjU4Ljg5OTI4IDY2OS4zNV0KL1R5cGUgL0Fubm90Cj4+
    CmVuZG9iagoxMCAwIG9iago8PCAvQm9yZGVyIFswIDAgMF0KL0EgPDwgL1R5
    cGUgL0FjdGlvbgovUyAvVVJJCi9VUkkgKGh0dHBzOi8vZG9pLm9yZy9kb2k6
    IDEwLjQ3MTAyL2FubmFscy1hY2FkbWVkc2cuMjAyMDQ1OSkKPj4KL1N1YnR5
    cGUgL0xpbmsKL1JlY3QgWzY5LjMzOTI4IDU4My4zNiAyNTguODk5MjggNTky
    LjYxXQovVHlwZSAvQW5ub3QKPj4KZW5kb2JqCjExIDAgb2JqCjw8IC9Cb3Jk
    ZXIgWzAgMCAwXQovQSA8PCAvVHlwZSAvQWN0aW9uCi9TIC9VUkkKL1VSSSAo
    aHR0cHM6Ly9kb2kub3JnL2RvaTogMTAuMTExMS9jZW8uMTM4NzQpCj4+Ci9T
    dWJ0eXBlIC9MaW5rCi9SZWN0IFs2OS4zMzkyOCA1MDYuNjIgMTczLjQ1OTI4
    IDUxNS44N10KL1R5cGUgL0Fubm90Cj4+CmVuZG9iagp4cmVmCjAgMTIKMDAw
    MDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAx
    MDkgMDAwMDAgbiAKMDAwMDAwMDE1OCAwMDAwMCBuIAowMDAwMDAwMjE1IDAw
    MDAwIG4gCjAwMDAwMDI4MzEgMDAwMDAgbiAKMDAwMDAwMzE1MSAwMDAwMCBu
    IAowMDAwMDAzMjUzIDAwMDAwIG4gCjAwMDAwMDMzNTAgMDAwMDAgbiAKMDAw
    MDAwMzQ1NSAwMDAwMCBuIAowMDAwMDAzNjUzIDAwMDAwIG4gCjAwMDAwMDM4
    NTMgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSAxMgovUm9vdCAyIDAgUgov
    SW5mbyAxIDAgUgo+PgpzdGFydHhyZWYKNDAzNwolJUVPRgo=`;
};

const getSampleMedicalKeywordResults = (): GetSearchMedicalKeywords.Datum[] => [
  {
    id: "1",
    type: "searchMedicalKeywords",
    name: "Jessica Koh",
    image: imgStockPhoto3,
    department: {
      id: "3",
      type: "department",
      name: "Ophthalmology",
    },
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
    department: {
      id: "3",
      type: "department",
      name: "Ophthalmology",
    },
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

const getSamplePublicationKeywordResults =
  (): GetSearchPublications.Datum[] => [
    {
      id: "10",
      type: "searchPublication",
      name: "William Prince",
      image: imgStockPhoto4,
      department: {
        id: "1",
        type: "department",
        name: "Ophthalmology",
      },
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
