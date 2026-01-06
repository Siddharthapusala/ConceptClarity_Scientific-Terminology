from sqlalchemy.orm import Session
from ..database import SessionLocal, engine
from ..models import Term

def seed_database():
    db = SessionLocal()
    
    existing_terms = db.query(Term).count()
    if existing_terms > 0:
        print(f"Database already has {existing_terms} terms. Skipping seed.")
        db.close()
        return
    
    sample_terms = [
        {
            "term": "Photosynthesis",
            "definition": "The process by which plants and other organisms convert light energy into chemical energy. Plants use sunlight, water, and carbon dioxide to produce glucose and oxygen. This process is essential for life on Earth as it produces oxygen and forms the base of most food chains."
        },
        {
            "term": "Quantum Physics",
            "definition": "The branch of physics that studies the behavior of matter and energy at the atomic and subatomic level. It reveals that particles can exist in multiple states simultaneously (superposition) and can be connected across vast distances (entanglement). This field has led to technologies like lasers, transistors, and quantum computers."
        },
        {
            "term": "DNA Replication",
            "definition": "The biological process by which DNA makes a copy of itself during cell division. This process ensures that genetic information is passed accurately from one generation to the next. It involves unwinding the double helix, creating new complementary strands, and proofreading to minimize errors."
        },
        {
            "term": "Black Hole",
            "definition": "A region in space where gravity is so strong that nothing, not even light, can escape from it. Black holes form when massive stars collapse under their own gravity. They have an event horizon - a point of no return - and can merge with other black holes, releasing gravitational waves."
        },
        {
            "term": "Climate Change",
            "definition": "Long-term shifts in global temperatures and weather patterns, primarily caused by human activities like burning fossil fuels. This leads to rising sea levels, extreme weather events, and ecosystem disruptions. Addressing climate change requires global cooperation and transitioning to renewable energy sources."
        },
        {
            "term": "Artificial Intelligence",
            "definition": "The simulation of human intelligence in machines that can learn, reason, and make decisions. AI systems use algorithms and data to recognize patterns, solve problems, and perform tasks that typically require human intelligence. Applications include natural language processing, computer vision, and autonomous systems."
        }
    ]
    
    try:
        for term_data in sample_terms:
            term = Term(**term_data)
            db.add(term)
        
        db.commit()
        print(f"Successfully seeded {len(sample_terms)} scientific terms!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()