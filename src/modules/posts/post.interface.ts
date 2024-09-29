
export type TPost = {
    _id? : string,
    title : string;
    category : string;
    rating?: string;
    description : string;
    images : string[];
    comments? : string[];
    isDeleted? : boolean;
    createdAt? : string,
    updatedAt? : string,
};

// export type TReturnCarPayload = {
//     bookingId : string;
// }

// export type TCarsQuery = {
//       carType?: string,
//       costRange?: string,
//       sortByCost? : string;
//       location?: string,
//       status? : string,
//   }