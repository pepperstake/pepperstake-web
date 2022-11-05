import Header from './header'
type Props = {
    children: React.ReactNode;
};


export default function Layout({children} : Props){
    

    return (
        <>
        <div className=" h-16 ">
            <Header>{children}</Header> 
        </div>
        </>
    );
}