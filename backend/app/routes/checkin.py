from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, models, face_utils
from ..database import get_db

router = APIRouter(prefix="/checkin", tags=["Check-in"])

@router.post("", response_model=schemas.CheckinResponse)
def checkin(request: schemas.CheckinRequest, db: Session = Depends(get_db)):
    # Get live embedding
    try:
        live_embedding = face_utils.get_face_embedding(request.image_base64)
    except Exception as e:
        return schemas.CheckinResponse(success=False, message=f"Face not detected: {str(e)}")
    
    # Get all members that are not yet checked in (optional: search all, but check check-in status later)
    all_members = db.query(models.Member).all()
    
    best_match = None
    best_score = 0.0
    THRESHOLD = 0.55   # tune for your dataset
    
    for member in all_members:
        sim = face_utils.cosine_similarity(live_embedding, member.face_embedding)
        if sim > best_score:
            best_score = sim
            best_match = member
    
    if best_match and best_score >= THRESHOLD:
        if best_match.checked_in:
            return schemas.CheckinResponse(
                success=False,
                message=f"{best_match.name} has already checked in"
            )
        # Mark as checked in
        best_match.checked_in = True
        db.commit()
        team = best_match.team
        return schemas.CheckinResponse(
            success=True,
            message="Access granted",
            name=best_match.name,
            team=team.name,
            idea=team.idea_title
        )
    else:
        return schemas.CheckinResponse(
            success=False,
            message="Face not recognized. Please ensure you have registered."
        )