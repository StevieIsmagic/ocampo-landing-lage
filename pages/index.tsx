import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { useEffect, useRef } from 'react'
// import Bridge from '../components/Icons/Bridge'
// import Logo from '../components/Icons/Logo'
// import Modal from '../components/Modal'
import cloudinary from '../utils/cloudinary'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
// import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  // const router = useRouter()
  // const { photoId } = router.query
  // const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  // const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  // useEffect(() => {
  //   // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
  //   if (lastViewedPhoto && !photoId) {
  //     lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
  //     setLastViewedPhoto(null)
  //   }
  // }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
    <>
      <Head>
        {/* This is displayed on the browser tab */}
        <title>What do you call a writer who doesn't write?</title>
        <meta
          property="og:image"
          content="https://ocampo.io/og-image-1.png"
        />
        <meta
          name="twitter:image"
          content="https://ocampo.io/og-image-1.png"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {/* This text is displayed on the main html landing page */}
        <header className="mx-auto max-w-[1900px] text-center text-white/80 p-12 text-2xl">
          <Image
            className="mx-auto max-w-[1900px] text-center text-2xl"
            alt="Colombian Flag"
            width={62}
            height={38}
            src={`/apple-touch-icon.png`}
            sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
          />
          ~ What do you call ~
          <h1> One line family bio</h1>
        </header>
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="absolute inset-0 flex space-x-40 space-y-10">
          </div>

          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <a
              // href={`/?photoId=${id}`}
              // as={`/p/${id}`}
              // ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              // shallow
              key={id}
              href={`https://www.steven.ocampo.io`}
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Ocampo Family Member Headshot"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
              <h1 className="inset-0 text-white/75 flex justify-center text-2xl font-semibold">
                {"Elizabeth Ocampo"}</h1>
              <h3 className="inset-0 text-white/75 flex justify-center font-semibold">{"One line member bio"}</h3>
            </a>
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Praise be to {' '}
        <a
          href="https://ocampo.io"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          God {'<3'}
        </a>

      </footer>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()
  let reducedResults: ImageProps[] = []

  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image)
  })
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }

  return {
    props: {
      images: reducedResults,
    },
  }
}
