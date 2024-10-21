import UserProfile from "../userData/userData";

function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-blue-500 to-blue-700 h-[120px] flex items-center justify-between px-[40px] shadow-lg relative">
      <div className="flex-1">
        <h1 className="text-white text-[36px] font-bold tracking-wide">Blue Horizon - Galle</h1>
        <p className="text-white text-[16px] italic mt-[5px]">Discover the Beauty of Galle's Coastline</p>
      </div>
      <UserProfile img="https://i.pravatar.cc/150?img=3" name="Savindu Amalka" />
    </header>
  );
}

export default Header;
