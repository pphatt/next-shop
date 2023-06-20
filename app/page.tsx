"use client";
import styles from "@/styles/index.module.scss";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import { use, useEffect, useMemo, useState } from "react";
import Carousel from "@/components/carousel";
import useSWR from "swr";

// async function getData() {
//   const res = await fetch("http://localhost:8000/products");
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
//
//   // Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//
//   return res.json();
// }
//
// const query = getData();

// function makeQueryClient() {
//   const fetchMap = new Map<string, Promise<any>>();
//
//   return function queryClient<QueryResult>(
//     name: string,
//     query: () => Promise<QueryResult>
//   ): Promise<QueryResult> {
//     if (!fetchMap.has(name)) {
//       fetchMap.set(name, query());
//     }
//     return fetchMap.get(name)!;
//   };
// }
//
// const queryClient = makeQueryClient();

const b64toBlob = (b64Data: string, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export default function Home() {
  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/products",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // const [data, setData] = useState<
  //   {
  //     _id: string;
  //     productName: string;
  //     image: string;
  //     price: string;
  //   }[]
  // >([]);

  // const mutateData = (data: any[]): any[] => {
  //   let mutatedDataArr = data.map((value) => {
  //     const blob = b64toBlob(value.image, "image/png");
  //     const blobURL = URL.createObjectURL(blob);
  //
  //     return {
  //       ...value,
  //       image: blobURL,
  //     };
  //   });
  //
  //   console.log(mutatedDataArr)
  //
  //   return mutatedDataArr;
  // };

  // useEffect(() => {
  //   data?.map((value) => {
  //     const blob = b64toBlob(value.image, "image/png");
  //     const blobURL = URL.createObjectURL(blob);
  //
  //     return {
  //       ...value,
  //       image: blobURL
  //     }
  //   })
  // }, [isLoading])

  const parserImageBlob = useMemo(() => {
    return data?.map((value: any) => {
      const blob = b64toBlob(value.image, "image/png");
      const blobURL = URL.createObjectURL(blob);
      console.log(blobURL);

      return {
        ...value,
        image: blobURL,
      };
    });
  }, [data]);

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;

  // const data: {
  //   _id: string;
  //   productName: string;
  //   image: string;
  //   price: string;
  // }[] = use(
  //   queryClient("products", () =>
  //     fetch("http://localhost:8000/products").then((res) => res.json())
  //   )
  // );

  // const data: {
  //   _id: string;
  //   productName: string;
  //   image: string;
  //   price: string;
  // }[] = use(query);

  // console.log(data);
  // console.log(data[0].productName);
  // console.log(data[1].productName);

  // useEffect(() => {
  //   for (const key of data) {
  //     const blob = b64toBlob(key.image, "image/png");
  //     key.image = URL.createObjectURL(blob);
  //   }
  // }, []);

  // const res = await fetch('http://localhost:8000')

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // } else {
  //   console.log(res.json())
  // }

  // const test = useCallback(async () => {
  //   const data = await getData()
  //   console.log(data)
  // }, [])

  // const data = await getData()
  //
  // console.log(data)

  // useEffect(() => {
  //   // const testExpress = async () => {
  //   //   const a = await fetch("http://localhost:8000")
  //   //   const data = a.json()
  //   //   console.log(data)
  //   // }
  //   //
  //   // testExpress()
  //
  //   // test()
  // }, [])

  return (
    <main className={styles.home}>
      <NavigationBar />

      <header className={styles["header"]}>
        <div className={styles["header-container"]}>
          <div className={styles["poster-wrapper"]}>
            <div className={styles["poster"]}></div>
            <div className={styles["colorize"]}></div>
          </div>
          <div className={styles["info-card"]}>
            <div className={styles["info-card-wrapper"]}>
              <h2>
                TRANSPORT YOURSELF TO THE NEWEST FIGURE OF THIS ISEKAI FAVORITE
              </h2>
              <h1>Am I Actually the Strongest?</h1>
              <div>
                <span>Made in Japan</span>
                <a href={"/"}>
                  <span>VIEW MORE INFO</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {data?.length && (
          <Carousel.Skeleton
            length={4}
            line_1={"THIS WEEK&apos;S NEW FIGURE RELEASES"}
            line_2={"Check out our latest and greatest"}
          />
        )}

        {/*{data?.length && (*/}
        {/*  <Carousel.Layout*/}
        {/*    products={parserImageBlob}*/}
        {/*    line_1={"THIS WEEK&apos;S NEW FIGURE RELEASES"}*/}
        {/*    line_2={"Check out our latest and greatest"}*/}
        {/*  />*/}
        {/*)}*/}
      </div>

      <Footer />
    </main>
  );
}
