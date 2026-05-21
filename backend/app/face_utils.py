import base64
import numpy as np
from PIL import Image
from io import BytesIO
import cv2
from deepface import DeepFace

def image_from_base64(img_b64: str) -> np.ndarray:
    """Convert base64 image (data:image/jpeg;base64,...) to OpenCV BGR array"""
    # Remove header if present
    if ',' in img_b64:
        img_b64 = img_b64.split(',')[1]
    img_data = base64.b64decode(img_b64)
    pil_img = Image.open(BytesIO(img_data))
    # Convert PIL RGB to OpenCV BGR
    opencv_img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
    return opencv_img

def get_face_embedding(img_b64: str) -> list:
    """Extract face embedding (128-d vector) from image"""
    img = image_from_base64(img_b64)
    try:
        # DeepFace returns list of dicts, we take first face
        embedding_obj = DeepFace.represent(img, model_name="Facenet", enforce_detection=False)
        embedding = embedding_obj[0]["embedding"]
        return embedding
    except Exception as e:
        raise ValueError(f"Face detection failed: {str(e)}")

def cosine_similarity(emb1: list, emb2: list) -> float:
    vec1 = np.array(emb1)
    vec2 = np.array(emb2)
    dot = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return dot / (norm1 * norm2)