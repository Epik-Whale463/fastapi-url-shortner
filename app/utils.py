import random
import string

def generate_short_code(length: int = 6) -> str:
    """Generates a random alphanumeric short code."""
    chars = string.ascii_letters + string.digits
    return "".join(random.choices(chars, k=length))
