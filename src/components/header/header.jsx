import UserProfile from "../userData/userData";

function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 py-6 px-4 sm:px-6 md:px-8 lg:px-[50px] shadow-lg relative top-0">
      <div className="container flex flex-col items-center justify-between gap-4 mx-auto sm:flex-row">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-wide text-white leading-tight">
            BLUE HORIZON
          </h1>
          <p className="mt-1 text-sm italic text-blue-100 sm:text-base md:text-lg">
            Galle • Sri Lanka
          </p>
        </div>
        <UserProfile />
      </div>
    </header>
  );
}

export default Header;
