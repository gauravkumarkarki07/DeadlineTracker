type ErrorComponentProps = {
  message?: string;
  onRetry?: () => void;
};

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message = 'An error occurred', onRetry }) => {
  return (
    <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md">
      <h2 className="font-semibold text-lg">Error</h2>
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorComponent;
