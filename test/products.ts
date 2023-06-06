const products: { figure: { name: string; image: string } }[] = [
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
        "https://product.hstatic.net/1000160337/product/figma_movie_jujutsu_kaisen_0_yuta_okkotsu__2__e2cee8ed1f694140b7371321e0fa881e_master.jpg",
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

// "Good Smile Company",
//   "Kotobukiya",
//   "Max Factory",
//   "FREEing",
//   "MegaHouse",
//   "Bandai Spirit",
//   "Phat Company",
//   "Kadokawa",

const sixteen: {
  figure: {
    name: string;
    image: string;
    hover_image?: string;
    company: string;
  };
}[] = [
  {
    figure: {
      name: "Some chinese figure",
      image:
        "https://product.hstatic.net/1000160337/product/vsinger_luo_tianyi_grain_in_ear_ver._1__1__d8c033b7490d49bb92ec423d5324f949_master.jpg",
      hover_image:
        "https://product.hstatic.net/1000160337/product/vsinger_luo_tianyi_grain_in_ear_ver._1__2__7ce156646b7a4d97a9c232b7b7b04ccf_master.jpg",
      company: "Kadokawa",
    },
  },
  {
    figure: {
      name: "Eria the Water Charmer",
      image:
        "https://product.hstatic.net/1000160337/product/i-oh__card_game_monster_figure_collection_eria_the_water_charmer_1__6__cd47723e89b649f19e6ff632801645d2_master.jpg",
      hover_image:
        "https://product.hstatic.net/1000160337/product/i-oh__card_game_monster_figure_collection_eria_the_water_charmer_1__8__28cc14b260c74f8a92c24b4619bfbcec_master.jpg",
      company: "Kadokawa",
    },
  },
  {
    figure: {
      name: "Hiita the Fire Charmer",
      image:
        "https://product.hstatic.net/1000160337/product/i-oh__card_game_monster_figure_collection_hiita_the_fire_charmer_1__2__15356952de204ffda4fd2b828af1c59d_master.jpg",
      hover_image:
        "https://product.hstatic.net/1000160337/product/i-oh__card_game_monster_figure_collection_hiita_the_fire_charmer_1__1__833b6372d6914909b4ddc4921d18f207_master.jpg",
      company: "Kadokawa",
    },
  },
  {
    figure: {
      name: "Lycoris Recoil Takina Inoue",
      image:
        "https://product.hstatic.net/1000160337/product/lycoris_recoil_takina_inoue_1__7__fd6a52effada40cea30fc85e3790f334_master.jpg",
      hover_image:
        "https://product.hstatic.net/1000160337/product/lycoris_recoil_takina_inoue_1__5__fdb27543eb2d41b5bb6e52146d066138_master.jpg",
      company: "Kadokawa",
    },
  },
  {
    figure: {
      name: "Atelier Sophie: The Alchemist of the Mysterious Book Corneria",
      image:
        "https://product.hstatic.net/1000160337/product/atelier_sophie_the_alchemist_of_the_mysterious_book_corneria_1__1__37fc74dc69f64fa7b034a3a269b64248_master.jpg",
      hover_image:
        "https://product.hstatic.net/1000160337/product/atelier_sophie_the_alchemist_of_the_mysterious_book_corneria_1__2__45247d40919c48d8b24306d12793d9ba_master.jpg",
      company: "Bandai Spirit",
    },
  },
  {
    figure: {
      name: "POP UP PARADE Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Bell Cranel",
      image:
        "https://product.hstatic.net/1000160337/product/de_is_it_wrong_to_try_to_pick_up_girls_in_a_dungeon_iv_bell_cranel__6__52cd638fd39a4841b5092ce98517f101_master.jpg",
      hover_image:
        "https://product.hstatic.net/1000160337/product/de_is_it_wrong_to_try_to_pick_up_girls_in_a_dungeon_iv_bell_cranel__1__b7b8ff7eb47f4d22a193d45cd234efdf_master.jpg",
      company: "Bandai Spirit",
    },
  },
  {
    figure: {
      name: "figma Movie Jujutsu Kaisen 0 Yuta Okkotsu",
      image:
        "https://product.hstatic.net/1000160337/product/figma_movie_jujutsu_kaisen_0_yuta_okkotsu__2__e2cee8ed1f694140b7371321e0fa881e_master.jpg",
      hover_image:
        "https://product.hstatic.net/1000160337/product/figma_movie_jujutsu_kaisen_0_yuta_okkotsu__3__6498faa454e048078a9c766c76782456_master.jpg",
      company: "Bandai Spirit",
    },
  },
  {
    figure: {
      name: "ARTFX J TRIGUN STAMPEDE Vash the Stampede TRIGUN STAMPEDE Ver.",
      image:
        "https://product.hstatic.net/1000160337/product/artfx_j_trigun_stampede_vash_the_stampede_trigun_stampede_ver._1__4__2598a427ef994870bf17f93827274810_master.jpg",
      hover_image:
        "https://product.hstatic.net/1000160337/product/artfx_j_trigun_stampede_vash_the_stampede_trigun_stampede_ver._1__5__2526a8ba24004497908247e1d7b4a400_master.jpg",
      company: "Bandai Spirit",
    },
  },
  {
    figure: {
      name: "Tokyo Revengers Manjiro Sano Vol.24 Cover Illustration Ver.",
      image:
        "https://product.hstatic.net/1000160337/product/tokyo_revengers_manjiro_sano_vol.24_cover_illustration_ver._1__1__3af95f0dd31e42dcab819044d4077aea_master.jpg",
      hover_image:
        "https://product.hstatic.net/1000160337/product/tokyo_revengers_manjiro_sano_vol.24_cover_illustration_ver._1__2__6c15fb16eb06402cb11585668f282fed_master.jpg",
      company: "MegaHouse",
    },
  },
  {
    figure: {
      name: "POP UP PARADE Demon Slayer: Kimetsu no Yaiba Gyomei Himejima",
      image:
        "https://product.hstatic.net/1000160337/product/pop_up_parade_demon_slayer_kimetsu_no_yaiba_gyomei_himejima__6__3c534bcaa8124983886b64db7ba63391_master.jpg",
      hover_image:
        "https://product.hstatic.net/1000160337/product/pop_up_parade_demon_slayer_kimetsu_no_yaiba_gyomei_himejima__1__220be71108064fa285c3cac954266c5b_master.jpg",
      company: "MegaHouse",
    },
  },
  {
    figure: {
      name: "Hatsune Miku: NT Style Casual Wear Ver.",
      image:
        "https://product.hstatic.net/1000160337/product/hatsune_miku_nt_style_casual_wear_ver__8__e55978667e05477aa11b379acb4461b0_master.jpg",
      hover_image:
        "https://product.hstatic.net/1000160337/product/hatsune_miku_nt_style_casual_wear_ver__2__038748ebd5dc4e0292eddee2b54acb09_master.jpg",
      company: "MegaHouse",
    },
  },
  {
    figure: {
      name: "Azur Lane Ark Royal 1/7 Limited Edition",
      image:
        "https://product.hstatic.net/1000160337/product/azur_lane_ark_royal_1.7_limited_edition__2__23a2e4f7b3f14ab187dec06c6fe001e5_master.jpg",
      hover_image:
        "https://product.hstatic.net/1000160337/product/azur_lane_ark_royal_1.7_limited_edition__4__ac07eb140ccf4ae388ebfd9aada313cc_master.jpg",
      company: "MegaHouse",
    },
  },
];

export { products, sixteen };
