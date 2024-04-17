import Link from "next/link";

const Sell = () => {
return (
    <Link className="flex p-1 m-1" href="/Cannabuis/Sell">Sell</Link>
);
};
const OrderStock = () => {
return (
    <Link className="flex p-1 m-1" href="/Cannabuis/OrderStock">Order Stock</Link>
);
};

const Home = () => {
return (
    <Link className="flex p-1 m-1" href="/Cannabuis">Home</Link>
);
};

export default function NavBar() {
    return (
        <div className="flex flex-row justify-right h-1/6 w-full">
            <Home />
            <Sell />
            <OrderStock />
        </div>
    )
}