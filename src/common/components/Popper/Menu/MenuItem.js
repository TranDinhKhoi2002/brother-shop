import Link from 'next/link';

function MenuItem({ title, path }) {
  return (
    <div className="w-full justify-start py-[9px] px-[20px] text-[#f3f3f4] hover:bg-[#f4f5f9] hover:text-[#25262a]">
      <Link href={{ pathname: path, query: { title } }} as={path}>
        {title}
      </Link>
    </div>
  );
}

export default MenuItem;
