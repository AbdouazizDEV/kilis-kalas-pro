export interface IGoogleMapsLoaderService {
  load(): Promise<typeof google>;
  isLoaded(): boolean;
}
