import '../../App.css'

const Loader = () => {

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex gap-1.5 items-center h-16">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 bg-linear-to-t from-blue-600 via-blue-400 to-purple-600 rounded-full"
            style={{
              height: '100%',
              animation: 'wave 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.1}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Loader