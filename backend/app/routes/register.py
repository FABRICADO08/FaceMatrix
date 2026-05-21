from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, models, face_utils
from ..database import get_db

router = APIRouter(prefix="/register", tags=["Registration"])

@router.post("/team")
def register_team(team_data: schemas.TeamCreate, db: Session = Depends(get_db)):
    # Check if team already exists
    existing_team = db.query(models.Team).filter(models.Team.name == team_data.team_name).first()
    if existing_team:
        raise HTTPException(status_code=400, detail="Team name already exists")
    
    # Create team
    new_team = models.Team(name=team_data.team_name, idea_title=team_data.idea_title)
    db.add(new_team)
    db.commit()
    db.refresh(new_team)
    
    # Register each member
    for member_data in team_data.members:
        try:
            embedding = face_utils.get_face_embedding(member_data.image_base64)
        except Exception as e:
            db.delete(new_team)
            db.commit()
            raise HTTPException(status_code=400, detail=f"Face error for {member_data.name}: {str(e)}")
        
        new_member = models.Member(
            name=member_data.name,
            email=member_data.email,
            face_embedding=embedding,
            team_id=new_team.id
        )
        db.add(new_member)
    
    db.commit()
    return {"message": f"Team '{team_data.team_name}' with {len(team_data.members)} members registered successfully"}