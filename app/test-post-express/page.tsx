"use client";
import styles from "@/styles/index.module.scss";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import { ChangeEvent, use, useEffect, useState } from "react";

async function getData() {
  const res = await fetch("http://localhost:8000/products");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// const query = getData();

export default function Home() {
  const [image, setImage] = useState<Buffer>();
  // const data = use(query);
  // console.log(data);

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

  // useEffect(() => {
  //   for (const key of data) {
  //     const blob = b64toBlob(key.image, "image/png");
  //     const blobUrl = URL.createObjectURL(blob);
  //     console.log(key.productName)
  //     console.log(blobUrl);
  //   }
  // }, []);

  /*
   * TODO -> actually to READ
   *  -> Stage 1
   *  So when we convert it to based64 -> and Buffer it out, it actually convert it to the BINDATA based64
   *  We just need to concat it to the 'data:image:png;base64,'
   *  ...........................
   *  -> Stage 2
   *  -> What I did in stage 2 is that I am trying to convert the BINDATA based64 -> based64 -> blob
   *  ...........................
   *  -> Stage 3
   *  -> Everything is nice in the state 3
   *  -> The only thing that bug me in the stage 2 is that cannot submit the file which size is more than 65kb -> I
   *     solve that by passing the limit of the express.json() from 65kb to 50mb and It actually works
   * */

  const handleImageUpload = async (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files![0];
    const base64 = (await convertToBase64(file)) as string;

    const bindata = Buffer.from(base64.split(",")[1], 'base64');

    setImage(bindata);
  };

  function convertToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const upload = async (e: any) => {
    e.preventDefault();

    const { name, price } = e.target;

    const data = await fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        price: price.value,
        image,
      }),
    });

    if (data.ok) {
      console.log("Upload successful");
    } else {
      console.log("Upload failed");
    }
  };

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
        {/*<button onClick={() => upload()}>Save</button>*/}

        <form
          method={"POST"}
          onSubmit={(e) => upload(e)}
          encType={"multipart/form-data"}
        >
          <input type="text" name="name" placeholder="Input name" />
          <input
            type="text"
            name="price"
            placeholder="Input name"
            value={999}
            readOnly
          />

          <input
            id="photo_1"
            type="file"
            name="image"
            accept="image/png, image/jpg, image/jpeg"
            required
            onChange={(e) => handleImageUpload(e)}
          />

          <label htmlFor="photo_1" className="photo">
            Upload Photo
          </label>

          <button type="submit">Save</button>
        </form>

        {/*<div>*/}
        {/*  {data.map((value, index) => (*/}
        {/*    <div key={index}>*/}
        {/*      <div>{value.productName}</div>*/}
        {/*      <img src={value.image} />*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>

      <Footer />
    </main>
  );
}
