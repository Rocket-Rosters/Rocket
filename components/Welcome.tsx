export default function Welcome() {
  return (
    <section className="bg-purple-50">
      <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-right">
          <h1 className="text-4xl font-extrabold text-purple-800 sm:text-5xl sm:text-center mb-2">
            Welcome to Rocket Rosters!
          </h1>
          <p className="text-xl text-purple-600 sm:text-2xl sm:text-center mb-4">
            We're excited to have you onboard.
          </p>
          <iframe
            src="https://embed.lottiefiles.com/animation/94719"
            className="align-right"
          ></iframe>
        </div>
        <p className="text-lg font-bold text-purple-800 sm:text-xl sm:text-center sm:mt-12">
          Sorry, we couldn't find any subscription pricing plans for you just
          yet.
          <br />
          Please check back soon, and we'll have them ready for you!
        </p>
        <p className="text-lg text-purple-600 sm:text-xl sm:text-center mt-8">
          In the meantime, feel free to explore our programs and resources.
        </p>
      </div>
    </section>
  );
}
