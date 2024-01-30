import React from "react";

function Whatshapping() {
  const trendingData = [
    {
      category: "Politics",
      trending: "Nupur Sharma",
      postCount: 27400,
    },
    {
      category: "Sports",
      trending: "Gill",
      postCount: 21300,
    },
    {
      category: "Entertainment",
      trending: "Bobby Deol",
      postCount: 2191,
    },
    {
      category: "Sports",
      trending: "KL Rahul",
      postCount: 6955,
    },
    {
      trending: "Zubair",
      category: "Trending in India",
      trendingWith: "Communal Harmony",
      postCount: 6955,
    },
  ];
  return (
    <div className="" >
      <h1 className="font-bold text-2xl  px-4">What’s happening</h1>
      <div className="w-full ">
        {trendingData.map((val, i) => {
          return (
            <>
              <div className="my-3 py-2 cursor-pointer hover:bg-gray-200 hover:bg-opacity-95 w-full">
               <div className="px-4">
               <p className="textcolor">{val.category}-trending</p>
                <h1 className="textrgbe font-bold">#{val.trending}</h1>
                <div className="flex gap-1 textcolor">
                  {" "}
                  <p className="">{val.postCount}k </p>
                  <span> post</span>
                </div>
               </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Whatshapping;
