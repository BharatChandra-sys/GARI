import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ImageGallery.css';

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=2070',
      title: 'Rocket Launch',
      category: 'Launch Systems',
    },
    {
      url: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2070',
      title: 'Mission Control',
      category: 'Operations',
    },
    {
      url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2071',
      title: 'Satellite Systems',
      category: 'Technology',
    },
    {
      url: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=2080',
      title: 'Engineering',
      category: 'Development',
    },
  ];

  return (
    <section className="image-gallery-section">
      <div className="container-full">
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Work</h2>
          <p>Exploring the frontiers of aerospace innovation</p>
        </motion.div>

        <div className="gallery-scroll-container">
          <div className="gallery-scroll-track">
            {/* First set of images */}
            {images.map((image, index) => (
              <div
                key={`first-${index}`}
                className="gallery-item"
                onClick={() => setSelectedImage(image)}
              >
                <div className="gallery-image">
                  <img src={image.url} alt={image.title} />
                  <div className="gallery-overlay">
                    <span className="gallery-category">{image.category}</span>
                    <h3>{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {images.map((image, index) => (
              <div
                key={`second-${index}`}
                className="gallery-item"
                onClick={() => setSelectedImage(image)}
              >
                <div className="gallery-image">
                  <img src={image.url} alt={image.title} />
                  <div className="gallery-overlay">
                    <span className="gallery-category">{image.category}</span>
                    <h3>{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.url} alt={selectedImage.title} />
              <div className="lightbox-info">
                <span>{selectedImage.category}</span>
                <h3>{selectedImage.title}</h3>
              </div>
              <button
                className="lightbox-close"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ImageGallery;
