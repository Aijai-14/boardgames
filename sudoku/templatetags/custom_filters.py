# sudoku_game/templatetags/custom_filters.py

from django import template

register = template.Library()

@register.filter(name='range')
def customRange(value):
    return range(0, value)
