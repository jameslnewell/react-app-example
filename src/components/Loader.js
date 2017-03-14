import React from 'react';

//TODO: move to own package

const Loading = () => null;

const Error = ({error}) => (
  <div>
    <h1>Error:</h1>
    <p>{String(error)}</p>
  </div>
);

Error.propTypes = {
  error: React.PropTypes.instanceOf(Error)
};

export default (load, options = {}) => {
  const LoadingComponent = options.loading || Loading;
  const ErrorComponent = options.error || Error;

  class AsyncLoader extends React.Component {

    state = {
      loaded: false,
      error: false
    };

    componentDidMount() {
      const {loaded, error} = this.state;

      if (loaded || error) {
        return;
      }

      load().then(
        module => {
          this.component = module.default || module;
          this.setState({loaded: true});
        },
        err => {
          this.error = err;
          this.setState({error: true});
        }
      );
    }

    render() {
      const {loaded, error} = this.state;

      if (loaded) {
        const Component = this.component;
        return <Component {...this.props} />;
      }

      if (error) {
        return <ErrorComponent {...this.props} error={this.error} />;
      }

      return <LoadingComponent {...this.props} />;
    }
  }

  return AsyncLoader;
};
