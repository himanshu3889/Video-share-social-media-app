import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import axios from 'axios';

import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import { BASE_URL } from '../../utils';
import { IUser, Video } from '../../types';

const Search = ({ videos, searchedAccounts }: { videos: Video[] , searchedAccounts:IUser[] }) => {
  const [isVideos, setIsVideos] = useState(false);

  const router = useRouter();
  const { searchTerm }: any = router.query;

  const accountsStyle = !isVideos ? "border-b-2 border-black" : "text-gray-400";
  const videosStyle = isVideos ? "border-b-2 border-black" : "text-gray-400";

  return (
    <div className="w-full  ">
      <div className="flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full">
        <p
          onClick={() => setIsVideos(false)}
          className={`text-xl  font-semibold cursor-pointer ${accountsStyle} mt-2`}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer ${videosStyle} mt-2`}
          onClick={() => setIsVideos(true)}
        >
          Videos
        </p>
      </div>
      {!isVideos ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user-profile"
                      src={user.image}
                    />
                  </div>
                  <div>
                    <div>
                      <p className="flex gap-1 items-center text-lg font-bold text-primary">
                        {user.userName} <GoVerified className="text-blue-400" />
                      </p>
                      <p className="capitalize text-gray-400 text-sm">
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start ">
          {videos.length ? (
            videos.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResults text={`No Video Results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: { videos: res.data.videos, searchedAccounts:res.data.accounts },
  };
};

export default Search;
