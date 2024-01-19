import React, { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "../firebase";
import { isEmpty } from "../utls";

interface YourDocumentType {
  doc(): AnimeDetail;
  id: string;
}

interface AnimeDetail {
  episode: number;
  rating: number;
  recommendOthers: boolean;
  title: string;
}

interface AnimeAddFormProps {
  handleAnimeInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => AnimeDetail;
  submitAnime: (e: React.FormEvent) => void;
}

interface AnimeDetailList {
  id: number;
  title: string;
}

const AnimePage = () => {
  const [firebaseUserLoggedInData] = useAuthState(auth);

  const userId = firebaseUserLoggedInData?.uid;

  const [animeList, setAnimeList] = useState<YourDocumentType[] | undefined>(
    undefined
  );

  const [animeAddDetail, setAnimeAddDetail] = useState<AnimeDetail>({
    episode: 0,
    rating: 0,
    recommendOthers: false,
    title: "",
  });

  const [animeSelect, setAnimeSelect] = useState({
    checked: false,
    id: null,
  });

  const animeCollectionRef = collection(db, "anime");

  //   const getAnimeList = async () => {
  //     const q = query(
  //       collection(db, "anime"),
  //       where("userId", "==", auth?.currentUser?.uid)
  //     );

  //     const querySnapshot = await getDocs(q);

  //     const filteredData = querySnapshot.docs.map((doc) => ({
  //       ...(doc.data() as YourDocumentType),
  //       id: doc.id,
  //     }));

  //     setAnimeList(filteredData);
  //   };

  const getAnimeList = () => {
    try {
      if (userId) {
        const q = query(collection(db, "anime"), where("userId", "==", userId));

        getDocs(q)
          .then((querySnapshot) => {
            const filteredData = querySnapshot.docs.map((doc) => ({
              ...(doc.data() as YourDocumentType),
              id: doc.id,
            }));
            setAnimeList(filteredData);
          })
          .catch((error) => {
            console.error("Error fetching anime list:", error);
          });
      } else {
        console.error("User ID is undefined.");
      }
    } catch (error) {
      console.error("Error fetching anime list:", error);
    }
  };

  const handleAnimeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ): AnimeDetail => {
    let updatedAnimeDetail: AnimeDetail;

    switch (type) {
      case "EPISODE":
        updatedAnimeDetail = {
          ...animeAddDetail,
          episode: parseInt(e.target.value, 10),
        };
        break;
      case "RATING":
        updatedAnimeDetail = {
          ...animeAddDetail,
          rating: parseInt(e.target.value, 10),
        };
        break;
      case "RECOMMEND_OTHER":
        updatedAnimeDetail = {
          ...animeAddDetail,
          recommendOthers: e.target.checked,
        };
        break;
      case "TITLE":
        updatedAnimeDetail = {
          ...animeAddDetail,
          title: e.target.value,
        };
        break;
      default:
        updatedAnimeDetail = animeAddDetail;
    }
    setAnimeAddDetail(updatedAnimeDetail);
    return updatedAnimeDetail;
  };

  const submitAnime = () => {
    try {
      addDoc(animeCollectionRef, {
        episode: animeAddDetail?.episode,
        rating: animeAddDetail?.rating,
        recommendOthers: animeAddDetail?.recommendOthers,
        title: animeAddDetail?.title,
        userId: auth?.currentUser?.uid,
      })
        .then((addedAnimeRef) => {
          if (addedAnimeRef) {
            getAnimeList();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAnime = () => {
    // const animeDoc = doc(db, "anime", animeSelect?.id);

    const animeDoc = animeSelect?.id ? doc(db, "anime", animeSelect.id) : null;

    deleteDoc(animeDoc)
      .then(() => {
        getAnimeList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!isEmpty(userId)) {
      getAnimeList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div>
      <AnimeAddForm
        handleAnimeInputChange={handleAnimeInputChange}
        submitAnime={submitAnime}
      />

      <AnimeList
        animeList={animeList}
        setAnimeSelect={setAnimeSelect}
        animeSelect={animeSelect}
        deleteAnime={deleteAnime}
      />
    </div>
  );
};

export default AnimePage;

export const AnimeAddForm: React.FC<AnimeAddFormProps> = ({
  handleAnimeInputChange,
  submitAnime,
}) => {
  return (
    <>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        onChange={(e) => handleAnimeInputChange(e, "TITLE")}
      />
      <br />
      <br />
      <label htmlFor="episodes">Episodes</label>
      <input
        type="number"
        id="episodes"
        onChange={(e) => handleAnimeInputChange(e, "EPISODE")}
      />
      <br />
      <br />
      <label htmlFor="rating">Rating</label>
      <input
        type="number"
        id="rating"
        onChange={(e) => handleAnimeInputChange(e, "RATING")}
      />
      <br />
      <br />
      <label htmlFor="recommendOther">
        Would you recommend this to others?
      </label>
      <input
        type="checkbox"
        id="recommendOther"
        onChange={(e) => handleAnimeInputChange(e, "RECOMMEND_OTHER")}
      />
      <br />

      <button onClick={submitAnime}>Add anime</button>
    </>
  );
};

export const AnimeList = ({
  animeList,
  setAnimeSelect,
  animeSelect,
  deleteAnime,
}) => {
  return (
    <div className="anime_list">
      {animeList?.map((anime: AnimeDetailList) => {
        return (
          <div key={anime?.id}>
            <h3>
              {anime?.title}
              {` `}
            </h3>

            <input
              type="checkbox"
              name="delete anime"
              checked={animeSelect?.id === anime?.id && animeSelect?.checked}
              onChange={(e) =>
                setAnimeSelect(() => ({
                  checked: e.target.checked,
                  id: anime?.id,
                }))
              }
            />

            <br />

            <button onClick={deleteAnime}> Delete anime</button>
          </div>
        );
      })}
    </div>
  );
};
