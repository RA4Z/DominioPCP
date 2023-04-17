type LinkButtonProps = {
    text: string;
    color: string;
};
export const LinkButton = ({ text, color }: LinkButtonProps) => {
    return (
        <button
            className={`px-1 py-0 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition duration-300 ease-in-out`}
        >
            <p>{text}</p>
        </button>
    );
};
