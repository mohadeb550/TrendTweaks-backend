
export type TPost = {
    _id? : string,
    title : string;
    category : string;
    rating?: string;
    likesDislikes? : { likes : number, dislikes : number};
    description : string;
    images : string[];
    comments? :  TComment[];
    authorInfo : {
        name : string;
        email: string;
        image : string;
        role :string;
        authorId: string;
        authorEmail : string;
      }
    isDeleted? : boolean;
    createdAt? : string,
    updatedAt? : string,
};

export type TComment = {
  comment : string,
  userInfo  : {
    name : string,
    email : string,
    image : string
  },
  createdAt? : string,
  updatedAt? : string,
 
}

// export type TReturnCarPayload = {
//     bookingId : string;
// }

export type TCarsQuery = {
      userEmail?: string,
      costRange?: string,
      sortByCost? : string;
      location?: string,
      status? : string,
  }