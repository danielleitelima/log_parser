import MainView from './presentation/view/main-view';

//TODO: (II) this promise invocation can lead to the unhandled promise rejection
(async () => new MainView().show())();
