import { Injectable } from '@angular/core';
import {Image} from '../types/image.model';

export interface MasonryOptions {
  padding?: number;
  divisor?: number;
}

// Inspired by: https://medium.com/swlh/in-search-of-the-perfect-image-gallery-34f46f7615a1
const sum = (sequence) => sequence.reduce((totalSum, next) => totalSum + next, 0);
const max = (sequence) => sequence.reduce((maxValue, nextValue) => maxValue ? nextValue : maxValue, 0);

@Injectable({
  providedIn: 'root'
})
export class MasonryService {
  private exampleImages = [
    { title: 'test', alt: null, src: 'https://posterspy.com/wp-content/uploads/2018/12/WEB-Playing-Card-Fantastic-Beasts-HarryPotter18-24-poster-800x1066.jpg', ratio: 0.7504, width: 800, height: 1066 },
    { title: 'test', alt: null, src: 'https://posterspy.com/wp-content/uploads/2018/05/Claws-Illustrated-Movie-Poster-Ladislas-web-800x1067.jpg', ratio: 0.7497 , width: 800, height: 1067 },
    { title: 'test', alt: null, src: 'https://posterspy.com/wp-content/uploads/2018/02/Pacific-Rim-Uprising-Alternative-Poster-Ladislas-web-800x600.jpg', ratio: 1.333, width: 800, height: 600 },
    { title: 'test', alt: null, src: 'https://posterspy.com/wp-content/uploads/2018/01/web-POSTER-Prisoners-Hugh-Ladislas.jpg', ratio: 0.7577, width: 688, height: 908 },
    { title: 'test', alt: null, src: 'https://posterspy.com/wp-content/uploads/2018/01/Prisoners-Loki-poster-ladislas-illustration-web.jpg', ratio: 0.7502, width: 688, height: 917 },
    { title: 'test', alt: null, src: 'https://posterspy.com/wp-content/uploads/2018/01/illustration-Phantom-Thread-Alternative-Movie-Poster-Ladislas-web-800x1067.jpg', ratio: 0.7494, width: 688, height: 918 },
    { title: 'test', alt: null, src: 'https://posterspy.com/wp-content/uploads/2017/12/WEB-new-Three-billboards-outside-Ebbing-Missouri-poster-classic_48_sheet-800x400.jpg', ratio: 2, width: 688, height: 344 },
    { title: 'test', alt: null, src: 'https://posterspy.com/wp-content/uploads/2017/03/LaLaLand-Alternative-Movie-Poster-ladislas-web-1000-800x600.jpg', ratio: 1.33, width: 800, height: 600 },
    { title: 'test', alt: null, src: 'https://posterspy.com/wp-content/uploads/2017/12/Insidious-The-Lasy-Key-alternative-movie-poster-illustration-V2no-frame-web-800x1067.jpg', ratio: 0.7497, width: 800, height: 1067 },
    { title: 'test', alt: null, src: 'https://posterspy.com/wp-content/uploads/2017/12/Talenthouse-illustration-Insidious-The-Lasy-Key-alternative-movie-poster-Ladislas-web-800x1067.jpg', ratio: 0.7497, width: 800, height: 1067 },
    { title: 'test', alt: null, src: 'https://posterspy.com/wp-content/uploads/2017/02/kong-Skull-island-Alternative-Movie-Poster-WEB-800x1067.jpg', ratio: 0.7497, width: 800, height: 1067 },
    { title: 'test', alt: null, src: 'https://posterspy.com/wp-content/uploads/2017/02/web-Into-The-Wild-variant-alternative-poster-ladislas-1000.jpg', ratio: 0.7502, width: 688, height: 917 },
  ];
  private options: MasonryOptions = {
    padding: 2.5,
    divisor: 0.45
  };

  constructor() { }

  /**
   * @param images - a list of images to be used
   * @param containerWidth - the width of the container
   * @param containerHeight - the height of the container
   * @param options - the masonry options to use
   */
  public calculateLayoutForContainerWidth = (images: Image[], containerWidth: number, containerHeight: number, options: MasonryOptions): Image[] => {
    Object.assign(this.options, options);
    if (images.length === 0) {
      images = this.exampleImages;
    }
    // Ensure images are valid
    images = images.filter(image => {
      if (!image.ratio) {
        image.ratio = image.width / image.height;
      }

      return (image && image.height && image.width);
    });

    images = [...images, ...images.reverse(), ...images, ...images, ...images, ...images, ...images, ...images.reverse()];

    const gutter = this.options.padding;
    const { totalRows, idealHeight } = this.perfectNumberOfRows(images, containerWidth, containerHeight);
    console.log(totalRows, idealHeight);
    let laidOutImages = [];

    if (totalRows < 1) {
      laidOutImages = [
        images.map(image => ({
          ...image,
          alt: image.alt,
          src: image.src,
          width: (Math.floor(idealHeight * image.ratio) - (gutter * 2)),
          height: idealHeight
        }))
      ];
    } else {
      const weights    = images.map(image => Math.floor(image.ratio * 100));
      const partitions = this.bstLinearPartition(weights, totalRows);

      let current = 0;
      laidOutImages = partitions.map(row => {
        const summedRatios = row.reduce((total, next, i) => total + images[current + i].ratio, 0);

        return row.map(() => {
          const image = images[current++];
          return {
            ...image,
            alt: image.alt,
            src: image.src,
            width: Math.floor((containerWidth / summedRatios) * image.ratio) - (gutter * 2),
            height: Math.floor(containerWidth / summedRatios)
          };
        });
      });
    }

    return laidOutImages;
  }

  /**
   * Calculates the perfect number of rows based on the amount of images we need to render.
   *
   * @param images: object
   * @param width: number
   * @param height: number
   *
   * @return object
   */
  private perfectNumberOfRows = (images, width: number = 1, height: number = 1) => {
      const idealHeight = Math.floor(height * this.options.divisor);
      const totalWidth  = images.reduce((total, image) => total + image.ratio * idealHeight, 0);

      return { idealHeight, totalRows: Math.round(totalWidth / width)};
  }

  /**
   * Inspired by:
   * https://articles.leetcode.com/the-painters-partition-problem/
   * https://articles.leetcode.com/the-painters-partition-problem-part-ii/
   *
   * @param sequence
   * @param k
   */
  private bstLinearPartition = (sequence, k) => {
    if (sequence.length <= 1) {
      return [sequence];
    }

    if (k >= sequence.length) {
      return sequence.map(e => [e]);
    }

    const limit = this.calculateThreshold(sequence, k);
    let current = 0;

    return sequence.reduce((result, next) => {
      if (sum(result[current]) + next > limit) {
        current++;
      }

      result[current].push(next);
      return result;
    }, new Array(k).join().split(',').map(() => []));
  }

  /**
   * find the perfect limit that we should not pass when adding elements
   * to a single partition
   *
   * @param sequence
   * @param k
   * @returns {*}
   */
  private calculateThreshold = (sequence, k) => {
    let bottom = max(sequence);
    let top    = sum(sequence);

    while (bottom < top) {
      const middle = bottom + (top - bottom) / 2;
      this.calculateRequiredElements(sequence, middle) <= k ? top = middle : bottom = middle + 1;
    }

    return bottom;
  }

  /**
   * find how many elements from [seq] we cann group together stating below
   * [limit] by adding their weights
   *
   * @param sequence
   * @param limit
   *
   * @returns int - the amount of elements in this partition
   */
  private calculateRequiredElements = (sequence, limit) => (
      sequence.reduce((result, next) => {
        result.total += next;
        if (result.total > limit) {
          result.total = next;
          result.n++;
        }

        return result;
      }, { total: 0, n: 1 }).n
  )
}
