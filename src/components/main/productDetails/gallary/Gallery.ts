import './gallery.scss';

class Gallery {
  images: string[];

  parentElement: HTMLElement;

  constructor(
    parentElement: HTMLElement,
    images: string[],
    private imagesContainer: HTMLElement = document.createElement('div'),
    private imageMain = document.createElement('div'),
    private imagesThumbs = document.createElement('div'),
  ) {
    this.parentElement = parentElement;
    this.images = images;
    this.appendGallery();
  }

  private appendGallery(): void {
    this.imagesContainer.classList.add('gallery');
    this.parentElement.append(this.imagesContainer);

    this.imageMain.classList.add('gallery__main');
    this.imagesContainer.append(this.imageMain);

    this.imagesThumbs.classList.add('gallery__thumbs');
    this.imagesContainer.append(this.imagesThumbs);

    const mainImage: HTMLImageElement = document.createElement('img');
    mainImage.classList.add('gallery__main-img');
    mainImage.src = this.images[0];
    this.imageMain.append(mainImage);

    this.images.forEach((el, index) => {
      const image: HTMLImageElement = document.createElement('img');
      image.classList.add('gallery__thumbs-img');
      image.src = el;
      this.imagesThumbs.append(image);

      image.addEventListener('click', () => {
        mainImage.src = this.images[index];
      });
    });
  }
}

export default Gallery;
