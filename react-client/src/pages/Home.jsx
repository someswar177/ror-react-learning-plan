import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import CreateProduct from "../components/CreateProduct";
import { Box } from "@chakra-ui/react";

const Home = () => {
    return (
        <>
            <Navbar />

            <Box p={5}>
                <CreateProduct />
                <ProductList />
            </Box>
        </>
    );
};

export default Home;