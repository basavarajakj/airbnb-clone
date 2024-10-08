import getCurrentUser from "./actions/getCurrentUser";
import getListings, { Listing } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchPrams: Listing;
}


const Home = async ({ searchPrams }: HomeProps) => {

  const listings = await getListings(searchPrams);
  const currentUser = await getCurrentUser();

  if(listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset  />
      </ClientOnly>
    )
  }
  return (
    <main className='text-2x'>
      <ClientOnly >
        <Container>
          <div 
            className="
              pt-24
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-5
            "
          >
            
            {listings.map((listing: any) => (
              <ListingCard 
                key={listing.id}
                currentUser={currentUser}
                data={listing}
              />
             ))}
          </div>
        </Container>
      </ClientOnly>
    </main>
  )
}

export default Home;
