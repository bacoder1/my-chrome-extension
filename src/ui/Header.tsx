const Header: React.FC = () => {
	return (
		<header
			className="px-8 w-full select-none -z-10 py-3 font-semibold text-lg -mb-[3.25rem]"
			style={{
				borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
				boxShadow: "0 1.5px 6px 0 rgba(0, 0, 0, 0.05)",
			}}>
			🪶 Colibri
		</header>
	);
};

export default Header;
