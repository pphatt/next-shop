"use client";
import styles from "@/styles/index.module.scss";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import { useState } from "react";

const items: { figure: { name: string; image: string } }[] = [
  {
    figure: {
      name: "Some chinese figure",
      image:
        "https://theme.hstatic.net/1000160337/1000885200/14/home_collection_1_banner.jpg?v=307",
    },
  },
  {
    figure: {
      name: "Eria the Water Charmer",
      image:
        "https://product.hstatic.net/1000160337/product/i-oh__card_game_monster_figure_collection_eria_the_water_charmer_1__6__cd47723e89b649f19e6ff632801645d2_master.jpg",
    },
  },
  {
    figure: {
      name: "Hiita the Fire Charmer",
      image:
        "https://product.hstatic.net/1000160337/product/i-oh__card_game_monster_figure_collection_hiita_the_fire_charmer_1__2__15356952de204ffda4fd2b828af1c59d_master.jpg",
    },
  },
  {
    figure: {
      name: "Lycoris Recoil Takina Inoue",
      image:
        "https://product.hstatic.net/1000160337/product/lycoris_recoil_takina_inoue_1__7__fd6a52effada40cea30fc85e3790f334_master.jpg",
    },
  },
  {
    figure: {
      name: "Atelier Sophie: The Alchemist of the Mysterious Book Corneria",
      image:
        "https://product.hstatic.net/1000160337/product/atelier_sophie_the_alchemist_of_the_mysterious_book_corneria_1__1__37fc74dc69f64fa7b034a3a269b64248_master.jpg",
    },
  },
  {
    figure: {
      name: "POP UP PARADE Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Bell Cranel",
      image:
        "https://product.hstatic.net/1000160337/product/de_is_it_wrong_to_try_to_pick_up_girls_in_a_dungeon_iv_bell_cranel__6__52cd638fd39a4841b5092ce98517f101_master.jpg",
    },
  },
  {
    figure: {
      name: "figma Movie Jujutsu Kaisen 0 Yuta Okkotsu",
      image:
        "https://product.hstatic.net/1000160337/product/de_is_it_wrong_to_try_to_pick_up_girls_in_a_dungeon_iv_bell_cranel__6__52cd638fd39a4841b5092ce98517f101_master.jpg",
    },
  },
  {
    figure: {
      name: "ARTFX J TRIGUN STAMPEDE Vash the Stampede TRIGUN STAMPEDE Ver.",
      image:
        "https://product.hstatic.net/1000160337/product/artfx_j_trigun_stampede_vash_the_stampede_trigun_stampede_ver._1__4__2598a427ef994870bf17f93827274810_master.jpg",
    },
  },
];

const createItem = (
  active_index: number,
  index: number
): {
  styles: {
    transform: string;
    transitionDuration: string;
  };

  figure:
    | {
        name: string;
        image: string;
      }
    | undefined;
} => {
  const default_width: number = 338.75 + 15;

  let x = 0;

  // 6 + 0 === 6
  // 7 + 0 === 7

  // 6 + 1 === 7
  // 7 + 1 === 8 !< 8 => 0

  if (items.length - 2 + active_index < items.length) {
    x = -2 * default_width;
  }

  // if ((items.length - 3) - active_index + 2 === 1) {
  //   x = -default_width;
  // } else if ((items.length - 3) - active_index + 1 === 2) {
  //   x = -2 * default_width;
  // } else {
  //   x = Math.abs(index - active_index) * default_width;
  // }

  return {
    // styles: `transform: translate(${x}px, 0px), transition-duration: "300ms"`,
    styles: {
      transform: `translate(${x}px, 0px)`,
      transitionDuration: "300ms",
    },
    figure: items.at(index)?.figure,
  };
};

const CreateItemElement = ({
  position,
  index,
}: {
  position: number;
  index: number;
}) => {
  const item = createItem(position, index);

  return (
    <div className={styles["product"]} style={item.styles}>
      <div className={styles["product-wrapper"]}>
        <a href={"/"}>
          <div className={styles["product-image"]}>
            <div className={styles["product-image-wrapper"]}>
              <div className={styles["inner-wrapper"]}>
                <div className={styles["container-wrapper"]}>
                  <picture>
                    <source
                      media={"(min-width:768px)"}
                      srcSet={item.figure?.image}
                    />
                    <img
                      src="https://theme.hstatic.net/1000160337/1000885200/14/home_collection_1_banner.jpg?v=307"
                      alt="series cover for Vinland Saga from kodansha"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["product-information"]}>
            <div style={{ height: "50px", maxHeight: "44px" }}>
              {item.figure?.name}
            </div>
            <div style={{ fontWeight: "500" }}>$30.00</div>
            <div className={styles["view"]}>
              <span>View now</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default function Home() {
  // position === active_index
  const [position, setPosition] = useState(0);
  // const [index, setIndex] = useState(0);

  const setPrev = () => {
    setPosition(position < 0 ? items.length : position - 1);
  };

  const setNext = () => {
    setPosition(position < items.length ? position + 1 : 0);
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

      <section className={styles["section-1"]}>
        <div className={styles["section-wrapper"]}>
          <div className={styles["inner-section-wrapper"]}>
            <div className={styles["content"]}>
              <div className={styles["content-wrapper"]}>
                <div className={styles["content-header"]}>
                  <div className={styles["content-title"]}>
                    <h2>THIS WEEK&apos;S NEW FIGURE RELEASES</h2>
                    <h1>Check out our latest and greatest</h1>
                  </div>
                  <div className={styles["content-marker"]}>
                    <div className={styles["inner-content-marker"]}>
                      <div style={{ backgroundColor: "black" }}></div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div className={styles["content-carousel"]}>
                  <button onClick={() => setPrev()}>Prev</button>

                  <div className={styles["carousel"]}>
                    {[...Array(items.length)].map((_, index) => (
                      <CreateItemElement position={position} index={index} />
                    ))}
                  </div>

                  <button onClick={() => setNext()}>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
