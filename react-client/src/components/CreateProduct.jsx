import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_PRODUCT } from "../operations/mutations/productMutations";
import { Box, Input, Button } from "@chakra-ui/react";

const CreateProduct = () => {
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
    });

    const [createProduct] = useMutation(CREATE_PRODUCT);

    const handleSubmit = async () => {
        await createProduct({
            variables: {
                name: form.name,
                price: parseFloat(form.price),
                description: form.description,
            },
        });
    };

    return (
        <Box p={4}>
            <Input
                placeholder="Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
                placeholder="Price"
                onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <Input
                placeholder="Description"
                onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <Button mt={2} onClick={handleSubmit}>
                Add Product
            </Button>
        </Box>
    );
};

export default CreateProduct;