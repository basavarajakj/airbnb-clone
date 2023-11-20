'use client';

import { useMemo } from "react";
import { Reservation } from "@prisma/client";

import { SafeListing, safeUser } from "@/app/types";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

interface ListingClientProps {
  reservations?: Reservation[];
  listing: SafeListing & {
    user: safeUser
  };
  currentUser?: safeUser | null;
}


const ListingClient = ({
  listing,
  currentUser
}: ListingClientProps) => {

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  },[listing.category]);

  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.loactionValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo 
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.loactionValue}
            />
          </div>
        </div>
      </div>
    </Container>
   );
}
 
export default ListingClient;
