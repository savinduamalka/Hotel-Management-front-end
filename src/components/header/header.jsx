import UserProfile from "../userData/userData";

function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-[#7E60BF] to-[#E4B1F0] h-[150px] flex items-center justify-between px-[50px] shadow-none relative top-0">
      <div className="flex-1">
        <h1 className="text-[#FEF9F2] text-[42px] font-extrabold tracking-wider leading-tight">
          Blue Horizon - Galle
        </h1>
        <p className="text-[#FEF9F2] text-[18px] italic mt-[8px]">
          Discover the Beauty of Galle's Coastline
        </p>
      </div>
      <UserProfile img="" name="" />
    </header>
  );
}

export default Header;
